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
    SelectInput,
} from "react-admin";
import MyUrlField from "./MyUrlField";
import { checkEmailIsUnique, debounce } from "./validations";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let timerIdCreate;
let errorsCreate = {};
const validateCustomerCreation = async (values) => {
    if (timerIdCreate) {
        clearTimeout(timerIdCreate);
    }
    timerIdCreate = setTimeout(async () => {
        errorsCreate = await validateFields(values, "create")
    }, 2000)
    await sleep(4000);
    return errorsCreate;
};

let timerIdEdit;
let errorsEdit = {};
const validateCustomerEdit = async (values) => {
    if (timerIdEdit) {
        clearTimeout(timerIdEdit);
    }
    timerIdEdit = setTimeout(async () => {
        errorsEdit = await validateFields(values, "edit")
    }, 2000)
    await sleep(4000);
    return errorsEdit;
};

const validateFields = (values, editOrCreate) => {
    const errors = {};
    var promise = new Promise(function (resolve, reject) {
        setTimeout(async () => {
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
            let isEmailUnique = ""
            if (editOrCreate === "edit") {
                let currentEmail = ""
                await fetch("http://localhost:8000/api/customers/" + values.id).then(async function (response) {
                    await response.json().then(function (jsonData) {
                        currentEmail = jsonData.email;
                    })
                })
                isEmailUnique = await checkEmailIsUnique(values.email, currentEmail, "customers")
            }
            else { isEmailUnique = await checkEmailIsUnique(values.email, "", "customers"); }
            if (!isEmailUnique) {
                errors.email = 'Email already used';
            }
            resolve(errors)
        });
    });
    return promise;
}

const CustomerFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

export const CustomerList = (props) => (
    <List filters={<CustomerFilter />} {...props}>
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

const CustomerTitle = ({ record }) => {
    return <span>Customer {record ? `"${record.first_name}"` : ""}</span>;
};

export const CustomerEdit = (props) => (
    <Edit title={<CustomerTitle />} {...props}>
        {/* <SimpleForm validate={debounce(validateCustomerEdit, 1000)}> */}
        <SimpleForm validate={validateCustomerEdit}>
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
        <SimpleForm validate={validateCustomerCreation}>
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