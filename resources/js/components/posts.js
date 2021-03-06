import * as React from "react";
import { useMediaQuery } from "@material-ui/core";
import {
    List,
    SimpleList,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    DeleteButton,
    Edit,
    Create,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
    Filter,
    DateInput,
    DateField,
} from "react-admin";

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

export const PostList = (props) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm")); // mobile responsive
    return (
        <List filters={<PostFilter />} {...props}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.title}
                    secondaryText={(record) => `${record.views} views`}
                    tertiaryText={(record) =>
                        new Date(record.published_at).toLocaleDateString()
                    }
                />
            ) : (
                <Datagrid>
                    <TextField source="id" />
                    <ReferenceField source="user_id" reference="users">
                        <TextField source="name" />
                    </ReferenceField>
                    <TextField source="title" />
                    <TextField source="body" />
                    <DateField source="published_at" />
                    <EditButton />
                    <DeleteButton />
                </Datagrid>
            )}
        </List>
    );
};

const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

export const PostEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <ReferenceInput source="user_id" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput multiline source="body" />
            <DateInput label="Published" source="published_at" />
        </SimpleForm>
    </Edit>
);

export const PostCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="user_id" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput multiline source="body" />
            <DateInput label="Published" source="published_at" />
        </SimpleForm>
    </Create>
);
