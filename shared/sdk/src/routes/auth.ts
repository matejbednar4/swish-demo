import { ApiResponse, backendUrl } from "../global";
import type * as prismaTypes from "../../../backend/node_modules/@prisma/client/default";
import { Customer } from "./customer";

type RegisterCustomer = {
  email: string;
  password: string;
};

type RegisterBusiness = {
  email: string;
  password: string;
};

type LoginCustomer = {
  email: string;
  password: string;
};

type LoginBusiness = {
  email: string;
  password: string;
};

export const registerCustomer = async (
  customer: RegisterCustomer
): ApiResponse<{ token: string } | { error: string }> => {
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
  } catch (err) {
    return { status: 500, json: { error: "Network error" } };
  }
};

export const registerBusiness = async (
  business: RegisterBusiness
): ApiResponse<{ token: string } | { error: string }> => {
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
  } catch (err) {
    return { status: 500, json: { error: "Network error" } };
  }
};

export const loginCustomer = async (
  customer: LoginCustomer
): ApiResponse<{ token: string } | { error: string }> => {
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
  } catch (err) {
    return { status: 500, json: { error: "Network error" } };
  }
};

export const loginBusiness = async (
  business: LoginBusiness
): ApiResponse<{ token: string } | { error: string }> => {
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
  } catch (err) {
    return { status: 500, json: { error: "Network error" } };
  }
};

export const validateCustomerJWT = async (
  jwt: string
): ApiResponse<{ error: string }> => {
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
  } catch (err) {
    return { status: 500, json: { error: "Network error" } };
  }
};

export const validateBusinessJWT = async (
  jwt: string
): ApiResponse<{ error: string }> => {
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
  } catch (err) {
    return { status: 500, json: { error: "Network error" } };
  }
};
