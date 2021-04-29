export const checkEmailIsUnique = async (email, currentEmail) => {
    const apiUrl = "http://localhost:8000/api/customers";
    let isUnique = true;
    await fetch(apiUrl)
        .then(function (response) {
            return response.json().then(async function (jsonData) {
                let customers = jsonData[1];
                await customers.forEach(function (customer, index) {
                    if (customer.email !== currentEmail && customer.email === email) {
                        isUnique = false;
                    }
                })
                return isUnique
            });
        })
        .catch(function (err) {
            console.log("Fetch Error :-S", err);
        });
    return isUnique;
}