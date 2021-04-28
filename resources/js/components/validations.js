export const checkEmailIsUnique = async (email) => {
    const apiUrl = "http://localhost:8000/api/customers";
    return fetch(apiUrl)
        .then(function (response) {
            return response.json().then(function (jsonData) {
                let customers = jsonData[1];
                let isUnique = true;
                customers.forEach(function (customer, index) {
                    if (customer.email === email) {
                        isUnique = false;
                    }
                })
                return isUnique
            });
        })
        .catch(function (err) {
            console.log("Fetch Error :-S", err);
        });
}