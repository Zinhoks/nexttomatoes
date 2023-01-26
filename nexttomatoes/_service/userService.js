const BASE_URL = "http://localhost:3000";
const BASE_URL_AUTH = "http://localhost:3010";

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/api/users`);
  const json = await response.json();

  return json;
};

// single user
export const getUser = async (userId) => {
  const response = await fetch(`${BASE_URL}/api/users/${userId}`);
  const json = await response.json();

  if (json) return json;

  return {};
};

//add new user
export async function addUser(credentials) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    };
    const response = await fetch(`${BASE_URL_AUTH}/users/signup`, Options);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}

//update user

export async function updateUser(userId, formData) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${BASE_URL}/api/users/${userId}`, Options);
  const json = await response.json();
  return json;
}

export async function deleteUser(userId) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(`${BASE_URL}/api/users/${userId}`, Options);
  const json = await response.json();
  return json;
}
