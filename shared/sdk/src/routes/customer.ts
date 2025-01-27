import { ApiResponse, backendUrl } from "../global";
import type * as prismaTypes from "../../../backend/node_modules/@prisma/client/default";

export type Customer = prismaTypes.Customer & {
  address?: Partial<prismaTypes.CustomerAddress>;
  password?: prismaTypes.CustomerPassword;
  pfp?: prismaTypes.CustomerPfp;
};

export const getCustomers = async (
  jwt: string
): ApiResponse<{ customers: Customer[] } | { error: string }> => {
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
  } catch (err) {
    return { status: 500, json: { error: "Network error" } };
  }
};

export const getLoggedInCustomer = async (
  jwt: string
): ApiResponse<{ customer: Customer } | { error: string }> => {
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
  } catch (err) {
    return { status: 500, json: { error: "Network error" } };
  }
};

export const updateLoggedInCustomer = async (
  jwt: string,
  data: Partial<Customer>
): ApiResponse<{ customer: Customer } | { error: string }> => {
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
  } catch (err) {
    return { status: 500, json: { error: "Network error" } };
  }
};

export const deleteLoggedInCustomer = async (
  jwt: number
): ApiResponse<{ message: string } | { error: string }> => {
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
  } catch (err) {
    return { status: 500, json: { error: "Network error" } };
  }
};

export const updateLoggedInCustomerPfp = async (
  jwt: string,
  pfp: string
): ApiResponse<{ customer: Customer } | { error: string }> => {
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
  } catch (err) {
    return { status: 500, json: { error: "Network error" } };
  }
};

export const getCustomerById = async (
  jwt: string,
  id: number
): ApiResponse<{ customer: Customer } | { error: string }> => {
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
  } catch (err) {
    return { status: 500, json: { error: "Network error" } };
  }
};
