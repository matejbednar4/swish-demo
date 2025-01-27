import { backendUrl } from "../global";
export const getBusinesses = async (jwt) => {
    try {
        const response = await fetch(backendUrl + "/businesses", {
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
export const getBusinessTypes = async (jwt) => {
    try {
        const response = await fetch(backendUrl + "/businesses/types", {
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
export const getRandomBusinesses = async (jwt, amount, type = "ANY") => {
    try {
        const data = { amount, type };
        console.log(jwt, amount, type);
        const response = await fetch(backendUrl + "/businesses/random", {
            method: "GET",
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
export const getLoggedInBusiness = async (jwt) => {
    try {
        const response = await fetch(backendUrl + "/businesses/self", {
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
export const updateLoggedInBusiness = async (jwt, data) => {
    try {
        const response = await fetch(backendUrl + "/businesses/self", {
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
export const deleteLoggedInBusiness = async (jwt) => {
    try {
        const response = await fetch(backendUrl + "/businesses/self", {
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
export const getBusinessById = async (jwt, id) => {
    try {
        const response = await fetch(backendUrl + `/businesses/${id}`, {
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
