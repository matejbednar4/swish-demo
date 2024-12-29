import { backendUrl, endpoints } from "../global.js";
export {
  getBusinesses,
  getBusinessById,
  createBusiness,
  businessLogin,
  deleteBusiness,
  updateBusiness,
};

async function getBusinesses() {
  try {
    const response = await fetch(backendUrl + endpoints.businesses);
    const json = await response.json();
    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, json: { error: "Network error" } };
  }
}

async function getBusinessById(id) {
  try {
    const response = await fetch(backendUrl + endpoints.business + `?id=${id}`);
    const json = await response.json();
    return { status: response.status, json };
  } catch (err) {
    console.error(err);
    return { status: 500, json: { error: "Network error" } };
  }
}

async function createBusiness(email, password) {
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
    return { status: 500, json: { error: "Network error" } };
  }
}

async function businessLogin(email, password) {
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
    return { status: 500, json: { error: "Network error" } };
  }
}

async function deleteBusiness(id) {
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
    return { status: 500, json: { error: "Network error" } };
  }
}

async function updateBusiness(id, data) {
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
    return { status: 500, json: { error: "Network error" } };
  }
}
