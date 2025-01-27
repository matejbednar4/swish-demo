import { ApiResponse, backendUrl } from "../global";
import * as prismaTypes from "../../../backend/node_modules/@prisma/client/default";

export type Business = prismaTypes.Business & {
  address?: prismaTypes.BusinessAddress;
  password?: prismaTypes.BusinessPassword;
  pfp?: prismaTypes.BusinessPfp;
  header?: prismaTypes.BusinessHeaderPic;
};

export const getBusinesses = async (
  jwt: string
): ApiResponse<Business[] | { error: string }> => {
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
  } catch (err) {
    return { status: 500, json: { error: "Network error" } };
  }
};

export const getBusinessTypes = async (
  jwt: string
): ApiResponse<
  | {
      businessTypes: Array<string>;
    }
  | { error: string }
> => {
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
  } catch (err) {
    return { status: 500, json: { error: "Network error" } };
  }
};

export const getRandomBusinesses = async (
  jwt: string,
  amount: string,
  type: string
): ApiResponse<{ randomBusinesses: Business[] } | { error: any }> => {
  try {
    const response = await fetch(
      backendUrl + `/businesses/random?amount=${amount}&type=${type}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    return { status: response.status, json };
  } catch (err) {
    return { status: 500, json: { error: "Network error" } };
  }
};

export const getLoggedInBusiness = async (
  jwt: string
): ApiResponse<Business | { error: string }> => {
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
  } catch (err) {
    return { status: 500, json: { error: "Network error" } };
  }
};

export const updateLoggedInBusiness = async (
  jwt: string,
  data: Business
): ApiResponse<Business | { error: string }> => {
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
  } catch (err) {
    return { status: 500, json: { error: "Network error" } };
  }
};

export const deleteLoggedInBusiness = async (
  jwt: number
): ApiResponse<{ error: string }> => {
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
  } catch (err) {
    return { status: 500, json: { error: "Network error" } };
  }
};

export const getBusinessById = async (
  jwt: string,
  id: number
): ApiResponse<Business | { error: string }> => {
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
  } catch (err) {
    return { status: 500, json: { error: "Network error" } };
  }
};
