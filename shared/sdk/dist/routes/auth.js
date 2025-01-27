import { backendUrl } from "../global";
export const registerCustomer = async (customer) => {
    try {
        const response = await fetch(backendUrl + "/auth/register/customer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(customer),
        });
        const json = await response.json();
        return { status: response.status, json };
    }
    catch (err) {
        return { status: 500, json: { error: "Network error" } };
    }
};
export const registerBusiness = async (business) => {
    try {
        const response = await fetch(backendUrl + "/auth/register/business", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(business),
        });
        const json = await response.json();
        return { status: response.status, json };
    }
    catch (err) {
        return { status: 500, json: { error: "Network error" } };
    }
};
export const loginCustomer = async (customer) => {
    try {
        const response = await fetch(backendUrl + "/auth/login/customer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(customer),
        });
        const json = await response.json();
        return { status: response.status, json };
    }
    catch (err) {
        return { status: 500, json: { error: "Network error" } };
    }
};
export const loginBusiness = async (business) => {
    try {
        const response = await fetch(backendUrl + "/auth/login/business", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(business),
        });
        const json = await response.json();
        return { status: response.status, json };
    }
    catch (err) {
        return { status: 500, json: { error: "Network error" } };
    }
};
export const validateCustomerJWT = async (jwt) => {
    try {
        const response = await fetch(backendUrl + `/auth/validation/customer`, {
            method: "POST",
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
export const validateBusinessJWT = async (jwt) => {
    try {
        const response = await fetch(backendUrl + `/auth/validation/business`, {
            method: "POST",
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
