export default {
    // called when the user attempts to log in
    login: ({ username }) => {
        // localStorage.setItem('username', username);
        // accept all username/password combinations
        return Promise.resolve();
    },
    // called when the user clicks on the logout button
    logout: () => {
        axios.post('http://127.0.0.1:8000/logout').then(r=>{
            console.log("Hit");
            window.location = "/";
        }).catch(error => {
            console.log("ERROR:: ", error.response.data);
        });
        
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        // if (status === 401 || status === 403) {
        //     localStorage.removeItem('username');
        //     return Promise.reject();
        // }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        // return localStorage.getItem('username')
        //     ? Promise.resolve()
        //     : Promise.reject();
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};