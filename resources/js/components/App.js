import * as React from "react";
import ReactDOM from "react-dom";
import { fetchUtils, Admin, Resource } from "react-admin";
// import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';
import jsonServerProvider from "ra-data-json-server";
import dataProvider from "./dataProvider";

import PostIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";
import CustomerIcon from "@material-ui/icons/PersonAddSharp";

import Dashboard from "./Dashboard";
import authProvider from "./authProvider";
import { UserList } from "./users";
import { PostList, PostEdit, PostCreate } from "./posts";
import { CustomerList, CustomerEdit, CustomerCreate, UserProfile } from "./customers";

// const dataProvider = jsonServerProvider("http://localhost:5000");

const App = () => (
    <div>
        <Admin
            dashboard={Dashboard}
            authProvider={authProvider}
            dataProvider={dataProvider}
        >
            <Resource
                name="posts"
                list={PostList}
                edit={PostEdit}
                create={PostCreate}
                icon={PostIcon}
            />
            <Resource name="users" list={UserList} icon={UserIcon} />
            <Resource name="customers" list={CustomerList} icon={CustomerIcon} edit={CustomerEdit}
                create={CustomerCreate} />
        </Admin>
    </div>
);

export default App;

if (document.getElementById("admin")) {
    ReactDOM.render(<App />, document.getElementById("admin"));
}
