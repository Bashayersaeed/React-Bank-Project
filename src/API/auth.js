import instance from ".";

const register = async (formData) => {
  console.log("first");
  const data = await instance.post("/mini-project/api/auth/register", formData);
  localStorage.setItem("token", data.token);
  console.log("register data", data);
  return data;
};
const login = async (formData) => {
  const data = await instance.post("/mini-project/api/auth/login", formData);
  localStorage.setItem("token", data.token);
  console.log("login data", data);
  return data;
};
const profile = async () => {
  const data = await instance.get("/mini-project/api/auth/me");
  return data;
};

const transactions = async () => {
  const data = await instance.get("/mini-project/api/transactions/my");

  return data;
};

const deposit = async (amount) => {
  const response = await instance.put(
    "/mini-project/api/transactions/deposit",
    { amount }
  );
  return response.data;
};

const withdraw = async (amount) => {
  const response = await instance.put(
    "/mini-project/api/transactions/withdraw",
    { amount }
  );
  return response.data;
};

const users = async () => {
  const token = localStorage.getItem("token");
  const data = await instance.get("/mini-project/api/auth/users", {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
  return data;
};

const TransferUsers = async (amount, username) => {
  const response = await instance.put(
   `/mini-project/api/transactions/transfer/${username}`,
    { amount }
  );
  return response.data;
};


export { register, login, profile, transactions, deposit, withdraw, users, TransferUsers };
