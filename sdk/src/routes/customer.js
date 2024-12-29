import { backendUrl, endpoints } from "../global.js";
export {
  getCustomers,
  getCustomerById,
  createCustomer,
  customerLogin,
  deleteCustomer,
  updateCustomer,
};

async function getCustomers() {
  try {
    const response = await fetch(backendUrl + endpoints.customers);
    const json = await response.json();
    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, json: { error: "Network error" } };
  }
}

async function getCustomerById(id) {
  try {
    const response = await fetch(backendUrl + endpoints.customer + `?id=${id}`);
    const json = await response.json();
    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, json: { error: "Network error" } };
  }
}

async function createCustomer(email, password) {
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
    return { status: 500, json: { error: "Network error" } };
  }
}

async function customerLogin(email, password) {
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
    return { status: 500, json: { error: "Network error" } };
  }
}

async function deleteCustomer(id) {
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
    return { status: 500, json: { error: "Network error" } };
  }
}

async function updateCustomer(id, data) {
  try {
    const response = await fetch(
      backendUrl + endpoints.customer + `?id=${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const json = await response.json();
    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, json: { error: "Network error" } };
  }
}
