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
} from "react-admin";
import MyUrlField from "./MyUrlField";
import { checkEmailIsUnique } from "./validations";

const validateUserCreation = async (values) => {
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
    const isEmailUnique = await checkEmailIsUnique(values.email);
    if (!isEmailUnique) {
        errors.email = 'Email already used';
    }
    return errors
};

const CustomerFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

export const CustomerList = (props) => (
    <List filters={<CustomerFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="first_name" />
            <TextField source="last_name" />
            <EmailField source="email" />
            <TextField source="phone" />
            <MyUrlField source="website" />
            <TextField source="company" />
        </Datagrid>
    </List>
);

const CustomerTitle = ({ record }) => {
    return <span>Customer {record ? `"${record.first_name}"` : ""}</span>;
};

export const CustomerEdit = (props) => (
    <Edit title={<CustomerTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="title" />
            <TextInput source="first_name" />
            <TextInput source="last_name" />
            <TextInput label="Email Address" source="email" type="email" />
            <TextInput source="phone" />
            <TextInput label="Website" source="website" type="website" />
            <TextInput source="company" />
        </SimpleForm>
    </Edit>
);

export const CustomerCreate = (props) => (
    <Create {...props}>
        <SimpleForm validate={validateUserCreation}>
            <TextInput source="title" />
            <TextInput source="first_name" />
            <TextInput source="last_name" />
            <TextInput label="Email Address" source="email" type="email" />
            <TextInput source="phone" />
            <TextInput label="Website" source="website" type="website" />
            <TextInput source="company" />
        </SimpleForm>
    </Create>
);
