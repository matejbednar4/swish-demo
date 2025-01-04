import { backendUrl, endpoints } from "../global";
export {
  getCustomers,
  getCustomerById,
  registerCustomer,
  customerLogin,
  deleteCustomer,
  updateCustomer,
  Customer
};

interface Customer {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  score: number;
  createdAt: Date;
  filled: number;
}

type ApiResponse<T> =
  | { status: number; json: T }
  | { status: number; error: string };

const getCustomers = async function (): Promise<ApiResponse<Customer[]>> {
  try {
    const response = await fetch(backendUrl + endpoints.customers);
    const json = await response.json();
    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, error: "Network error" };
  }
};

const getCustomerById = async function (
  id: number
): Promise<ApiResponse<Customer>> {
  try {
    const response = await fetch(backendUrl + endpoints.customer + `?id=${id}`);
    const json = await response.json();
    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, error: "Network error" };
  }
};

const registerCustomer = async function (
  email: string,
  password: string
): Promise<ApiResponse<{ id: number }>> {
  const customer = { email, password };
  try {
    const response = await fetch(backendUrl + endpoints.customer, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    });
    const json = await response.json();
    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, error: "Network error" };
  }
};

const customerLogin = async function (
  email: string,
  password: string
): Promise<ApiResponse<{ id: number }>> {
  const user = { email, password };
  try {
    const response = await fetch(backendUrl + endpoints.customerLogin, {
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

const deleteCustomer = async function (
  id: number
): Promise<ApiResponse<{ message: string }>> {
  try {
    const response = await fetch(
      backendUrl + endpoints.customer + `?id=${id}`,
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

const updateCustomer = async function (
  id: number,
  data: { firstName: string; lastName: string; address: string }
): Promise<ApiResponse<{ message: string }>> {
  try {
    const response = await fetch(
      backendUrl + endpoints.customer + `?id=${id}`,
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
