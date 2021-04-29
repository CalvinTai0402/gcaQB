export const checkEmailIsUnique = async (email, currentEmail, tableName) => {
    const apiUrl = "http://localhost:8000/api/" + tableName;
    let isUnique = true;
    await fetch(apiUrl)
        .then(function (response) {
            return response.json().then(async function (jsonData) {
                let allData = jsonData[1];
                await allData.forEach(function (data, index) {
                    if (data.email !== currentEmail && data.email === email) {
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

// export function debounce(callback, wait) {
//     let timerId;
//     return (...args) => {
//         clearTimeout(timerId);
//         timerId = setTimeout(async () => {
//             const errors = await callback(...args);
//             console.log(errors)
//             return errors;
//         }, wait);
//     };
// }