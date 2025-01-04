import { backendUrl, endpoints } from "../global";
export {
  getBusinesses,
  getBusinessById,
  getRandomBusiness,
  registerBusiness,
  businessLogin,
  deleteBusiness,
  updateBusiness,
  Business,
};

interface Business {
  id: number;
  email: string;
  password: string;
  name: string;
  address: string;
  type: string;
  createdAt: Date;
  filled: number;
}

type ApiResponse<T> =
  | { status: number; json: T }
  | { status: number; error: string };

const getBusinesses = async function (): Promise<ApiResponse<Business[]>> {
  try {
    const response = await fetch(backendUrl + endpoints.businesses);
    const json = await response.json();
    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, error: "Network error" };
  }
};

const getBusinessById = async function (
  id: number
): Promise<ApiResponse<Business>> {
  try {
    const response = await fetch(backendUrl + endpoints.business + `?id=${id}`);
    const json = await response.json();
    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, error: "Network error" };
  }
};

const getRandomBusiness = async function (
  amount: Number
): Promise<ApiResponse<Business[]>> {
  try {
    const response = await fetch(
      backendUrl + endpoints.business + `/random?amount=${amount}`
    );
    const json = await response.json();
    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, error: "Network error" };
  }
};

const registerBusiness = async function (
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
    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, error: "Network error" };
  }
};

const businessLogin = async function (
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
    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, error: "Network error" };
  }
};

const deleteBusiness = async function (
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
    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, error: "Network error" };
  }
};

const updateBusiness = async function (
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
    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, error: "Network error" };
  }
};
