import { backendUrl, endpoints } from "../global";

export interface Customer {
  id: number;
  email: string;
  password: string;
  profilePicUrl: string;
  firstName: string;
  lastName: string;
  fullAddress: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  street: string;
  latitude: string;
  longitude: string;
  rating: number;
  balance: number;
  totalRewards: number;
  visitedPlaces: number;
  soldImages: number;
  createdAt: Date;
  filled: number;
}

export const emptyCustomer: Customer = {
  id: 0,
  email: "",
  password: "",
  profilePicUrl: "",
  firstName: "",
  lastName: "",
  fullAddress: "",
  country: "",
  state: "",
  city: "",
  postalCode: "",
  street: "",
  latitude: "",
  longitude: "",
  rating: 0,
  balance: 0,
  totalRewards: 0,
  visitedPlaces: 0,
  soldImages: 0,
  createdAt: new Date(),
  filled: 0,
};

type ApiResponse<T> =
  | { status: number; json: T }
  | { status: number; error: string };

export const getCustomers = async function (): Promise<
  ApiResponse<Customer[]>
> {
  try {
    const response = await fetch(backendUrl + endpoints.customers);
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

export const getCustomerById = async function (
  id: number
): Promise<ApiResponse<Customer>> {
  try {
    const response = await fetch(backendUrl + endpoints.customer + `?id=${id}`);
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

export const registerCustomer = async function (
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

    if ("error" in json) {
      return { status: response.status, error: json };
    }

    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, error: "Network error" };
  }
};

export const customerLogin = async function (
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

    if ("error" in json) {
      return { status: response.status, error: json };
    }

    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, error: "Network error" };
  }
};

export const deleteCustomer = async function (
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

    if ("error" in json) {
      return { status: response.status, error: json };
    }

    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, error: "Network error" };
  }
};

export const updateCustomer = async function (
  id: number,
  data: {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
  }
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

    if ("error" in json) {
      return { status: response.status, error: json };
    }

    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, error: "Network error" };
  }
};

export const updateCustomerName = async function (
  id: number,
  data: {
    firstName: string;
    lastName: string;
  }
): Promise<ApiResponse<{ message: string }>> {
  try {
    const response = await fetch(
      backendUrl + endpoints.customerUpdateName + `?id=${id}`,
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

export const updateCustomerAddress = async function (
  id: number,
  data: {
    street: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
  }
): Promise<ApiResponse<{ message: string }>> {
  try {
    const response = await fetch(
      backendUrl + endpoints.customerUpdateAddress + `?id=${id}`,
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

export const addProfilePic = async function (
  id: number,
  imageUri: string
): Promise<ApiResponse<{ imageUrl: string }>> {
  if (!id || !imageUri) {
    return {
      status: 400,
      error: "Missing required parameters: id or imageUri",
    };
  }
  const formData = new FormData();
  formData.append("pfp", {
    uri: imageUri,
    type: "image/jpeg",
    name: "profile-pic.jpg",
  } as any);

  try {
    const response = await fetch(
      backendUrl + endpoints.customerAddPfp + `?id=${id}`,
      {
        method: "POST",
        body: formData,
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
