import * as React from "react";
import ReactDOM from 'react-dom'
import { fetchUtils, Admin, Resource } from 'react-admin';
import { UserList } from './users';
import { PostList, PostEdit, PostCreate } from './posts';
import { CustomerCreate } from './customers';
import jsonServerProvider from 'ra-data-json-server';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import CustomerIcon from '@material-ui/icons/PersonAddSharp';
import Dashboard from './Dashboard';
import authProvider from './authProvider';

const dataProvider = jsonServerProvider('http://localhost:5000');

const App = () => (
    <div>
        <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
            <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
            <Resource name="users" list={UserList} icon={UserIcon} />
            <Resource name="customers" create={CustomerCreate} icon={CustomerIcon} />
        </Admin>
    </div>

);

export default App;

if (document.getElementById('admin')) {
    ReactDOM.render(<App />, document.getElementById('admin'));
}
