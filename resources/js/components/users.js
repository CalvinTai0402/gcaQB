import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    EmailField,
    TextInput,
    Filter,
} from "react-admin";
import MyUrlField from "./MyUrlField";

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

export const UserList = (props) => (
    <List filters={<UserFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="phone" />
            <MyUrlField source="website" />
            <TextField source="company_name" />
        </Datagrid>
    </List>
);
