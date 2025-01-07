import { backendUrl, endpoints } from "../global";

export interface Business {
  id: number;
  email: string;
  password: string;
  name: string;
  address: string;
  type: string;
  createdAt: Date;
  filled: number;
}

export interface BusinessType {
  id: number;
  name: string;
}

type ApiResponse<T> =
  | { status: number; json: T }
  | { status: number; error: string };

type ApiErrorResponse<T> =
  | { status: number; json: T }
  | { status: number; error: unknown };

export const getBusinesses = async function (): Promise<
  ApiResponse<Business[]>
> {
  try {
    const response = await fetch(backendUrl + endpoints.businesses);
    const json = await response.json();

    if ("error" in json) {
      return { status: response.status, error: json };
    }

    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, error: "Network error" };
  }
};

export const getBusinessById = async function (
  id: number
): Promise<ApiResponse<Business>> {
  try {
    const response = await fetch(backendUrl + endpoints.business + `?id=${id}`);
    const json = await response.json();

    if ("error" in json) {
      return { status: response.status, error: json };
    }

    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, error: "Network error" };
  }
};

export const getRandomBusiness = async function (
  amount: Number,
  type: String = "any"
): Promise<ApiErrorResponse<Business[]>> {
  try {
    const response = await fetch(
      backendUrl + endpoints.randomBusiness + `?amount=${amount}&type=${type}`
    );
    const json = await response.json();

    if (json === null) {
      return { status: 404, error: "User not found" };
    }

    if ("error" in json) {
      return { status: response.status, error: json.error };
    }

    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, error: err };
  }
};

export const getBusinessTypes = async (): Promise<
  ApiResponse<BusinessType[]>
> => {
  try {
    const response = await fetch(backendUrl + endpoints.businessTypes);
    const json = await response.json();

    if ("error" in json) {
      return { status: response.status, error: json };
    }

    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, error: "Network error" };
  }
};

export const registerBusiness = async function (
  email: string,
  password: string
): Promise<ApiResponse<{ id: number }>> {
  const business = { email, password };
  try {
    const response = await fetch(backendUrl + endpoints.business, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(business),
    });
    const json = await response.json();

    if ("error" in json) {
      return { status: response.status, error: json };
    }

    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, error: "Network error" };
  }
};

export const businessLogin = async function (
  email: string,
  password: string
): Promise<ApiResponse<{ id: number }>> {
  const user = { email, password };
  try {
    const response = await fetch(backendUrl + endpoints.businessLogin, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const json = await response.json();

    if ("error" in json) {
      return { status: response.status, error: json };
    }

    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, error: "Network error" };
  }
};

export const deleteBusiness = async function (
  id: number
): Promise<ApiResponse<{ message: string }>> {
  try {
    const response = await fetch(
      backendUrl + endpoints.business + `?id=${id}`,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if ("error" in json) {
      return { status: response.status, error: json };
    }

    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, error: "Network error" };
  }
};

export const updateBusiness = async function (
  id: number,
  data: { name: string; address: string; type: string }
): Promise<ApiResponse<{ message: string }>> {
  try {
    const response = await fetch(
      backendUrl + endpoints.business + `?id=${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const json = await response.json();

    if ("error" in json) {
      return { status: response.status, error: json };
    }

    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, error: "Network error" };
  }
};
