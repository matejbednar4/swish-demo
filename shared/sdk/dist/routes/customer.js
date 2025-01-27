import { backendUrl } from "../global";
export const getCustomers = async (jwt) => {
    try {
        const response = await fetch(backendUrl + "/customers", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        return { status: response.status, json };
    }
    catch (err) {
        return { status: 500, json: { error: "Network error" } };
    }
};
export const getLoggedInCustomer = async (jwt) => {
    try {
        const response = await fetch(backendUrl + "/customers/self", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        return { status: response.status, json };
    }
    catch (err) {
        return { status: 500, json: { error: "Network error" } };
    }
};
export const updateLoggedInCustomer = async (jwt, data) => {
    try {
        const response = await fetch(backendUrl + "/customers/self", {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        return { status: response.status, json };
    }
    catch (err) {
        return { status: 500, json: { error: "Network error" } };
    }
};
export const deleteLoggedInCustomer = async (jwt) => {
    try {
        const response = await fetch(backendUrl + "/customers/self", {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        return { status: response.status, json };
    }
    catch (err) {
        return { status: 500, json: { error: "Network error" } };
    }
};
export const updateLoggedInCustomerPfp = async (jwt, pfp) => {
    try {
        const fileUri = pfp;
        const response = await fetch(backendUrl + "/customers/self/pfp", {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ pfp: fileUri }),
        });
        const json = await response.json();
        return { status: response.status, json };
    }
    catch (err) {
        return { status: 500, json: { error: "Network error" } };
    }
};
export const getCustomerById = async (jwt, id) => {
    try {
        const response = await fetch(backendUrl + `/customers/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        return { status: response.status, json };
    }
    catch (err) {
        return { status: 500, json: { error: "Network error" } };
    }
};
