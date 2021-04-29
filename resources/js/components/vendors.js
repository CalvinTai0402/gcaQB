import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    EmailField,
    TextInput,
    Filter,
    Edit,
    Create,
    SimpleForm,
    EditButton,
    DeleteButton,
} from "react-admin";
import MyUrlField from "./MyUrlField";
import { checkEmailIsUnique } from "./validations";

const validateVendorCreation = async (values) => {
    const errors = {};
    if (!values.title) {
        errors.title = 'The title is required';
    }
    if (!values.first_name) {
        errors.first_name = 'The first name is required';
    }
    if (!values.last_name) {
        errors.last_name = 'The last name is required';
    }
    if (!values.email) {
        errors.email = 'Email is required';
    }
    const isEmailUnique = await checkEmailIsUnique(values.email, "", "vendors");
    if (!isEmailUnique) {
        errors.email = 'Email already used';
    }
    return errors
};

const validateVendorEdit = async (values) => {
    const errors = {};
    if (!values.title) {
        errors.title = 'The title is required';
    }
    if (!values.first_name) {
        errors.first_name = 'The first name is required';
    }
    if (!values.last_name) {
        errors.last_name = 'The last name is required';
    }
    if (!values.email) {
        errors.email = 'Email is required';
    }
    let currentEmail = ""
    await fetch("http://localhost:8000/api/vendors/" + values.id).then(async function (response) {
        await response.json().then(function (jsonData) {
            currentEmail = jsonData.email;
        })
    })
    const isEmailUnique = await checkEmailIsUnique(values.email, currentEmail, "vendors");
    if (!isEmailUnique) {
        errors.email = 'Email already used';
    }
    return errors
};

const VendorFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

export const VendorList = (props) => (
    <List filters={<VendorFilter />} {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="first_name" />
            <TextField source="last_name" />
            <EmailField source="email" />
            <TextField source="phone" />
            <MyUrlField source="website" />
            <TextField source="company" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

const VendorTitle = ({ record }) => {
    return <span>Vendors {record ? `"${record.first_name}"` : ""}</span>;
};

export const VendorEdit = (props) => (
    <Edit title={<VendorTitle />} {...props}>
        <SimpleForm validate={validateVendorEdit}>
            <TextInput disabled source="id" />
            <TextInput source="title" />
            <TextInput source="first_name" />
            <TextInput source="last_name" />
            <TextInput source="suffix" />
            <TextInput label="Email Address" source="email" type="email" />
            <TextInput source="phone" />
            <TextInput label="Website" source="website" type="website" />
            <TextInput source="company" />
            <TextInput source="notes" />
            <TextInput label="Billing Rate (/hr)" source='billing_rate' />
            <TextInput source="account_no" />
            <TextInput source="business_id" />
        </SimpleForm>
    </Edit>
);

export const VendorCreate = (props) => (
    <Create {...props}>
        <SimpleForm validate={validateVendorCreation}>
            <TextInput source="title" />
            <TextInput source="first_name" />
            <TextInput source="last_name" />
            <TextInput source="suffix" />
            <TextInput label="Email Address" source="email" type="email" />
            <TextInput source="phone" />
            <TextInput label="Website" source="website" type="website" />
            <TextInput source="company" />
            <TextInput source="notes" />
            <TextInput label="Billing Rate (/hr)" source='billing_rate' />
            <TextInput source="account_no" />
            <TextInput source="business_id" />
        </SimpleForm>
    </Create>
);