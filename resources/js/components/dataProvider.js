import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = "http://localhost:8000/api";
const httpClient = fetchUtils.fetchJson;

export default {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const filter = params.filter;
        let url;
        // Object.keys(filter).length returns 0 if empty or an integer > 0 if non-empty
        if (Object.keys(filter).length !== 0) {
            let query = filter.q;
            url = `${apiUrl}/${resource}?filter=${query}&field=${field}&order=${order}&page=${page}&perPage=${perPage}`;
        } else {
            url = `${apiUrl}/${resource}?field=${field}&order=${order}&page=${page}&perPage=${perPage}`;
        }
        return httpClient(url).then(function ({ headers, json }) {
            return {
                data: json[1],
                total: json[0],
            };
        });
        // return fetch(url)
        //     .then(function (response) {
        //         // if (response.status !== 200) {
        //         //     console.log(
        //         //         "Looks like there was a problem. Status Code: " +
        //         //             response.status
        //         //     );
        //         //     return;
        //         // }
        //         return response.json().then(function (jsonData) {
        //             return {
        //                 data: jsonData[1],
        //                 total: jsonData[0],
        //             };
        //         });
        //     })
        //     .catch(function (err) {
        //         console.log("Fetch Error :-S", err);
        //     });
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        // return httpClient(url).then(({ json }) => ({ data: json }));
        return httpClient(url).then(function ({ json }) {
            return {
                data: json,
            };
        });
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get("content-range").split("/").pop(), 10),
        }));
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: "PUT",
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: "PUT",
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) => {
        if (!params.data.attachments) {
            return httpClient(`${apiUrl}/${resource}`, {
                method: "POST",
                body: JSON.stringify(params.data),
            }).then(({ json }) => ({
                data: { ...params.data, id: json.id },
            }));
        }

        // Convert to array in case multiple attachments are needed in the future
        const newAttachments = [params.data.attachments];

        return Promise.all(newAttachments.map(convertFileToBase64))
            .then(base64Pictures =>
                base64Pictures.map(picture64 => ({
                    src: picture64,
                    title: `${params.data.title}`,
                }))
            )
            .then(transformedNewAttachments => {
                params.data.attachments = [...transformedNewAttachments];
                console.log(params.data);
                return httpClient(`${apiUrl}/${resource}`, {
                    method: "POST",
                    body: JSON.stringify(params.data),
                }).then(({ json }) => ({
                    data: { ...params.data, attachments: [...transformedNewAttachments], id: json.id },
                })) }
            );
    },

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: "DELETE",
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url, {
            method: "DELETE",
        }).then(({ json }) => ({ data: json }));
        // return httpClient(url, {
        //     method: "DELETE",
        // }).then(function ({ json }) {
        //     return {
        //         data: json,
        //     };
        // });
    },
};

/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = file => new Promise((resolve, reject) => {
     const reader = new FileReader();
     reader.onload = () => resolve(reader.result);
     reader.onerror = reject;

     reader.readAsDataURL(file.rawFile);
 });
