import axios from "axios";

const getUsers = async () => {
  try {
    const response = await axios.get("localhost:3100/users");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (user: any) => {
  try {
    const response = await axios.post("localhost:3100/user/create", user);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (studentId: number, user: any) => {
  try {
    const response = await axios.put("localhost:3100/user/update/" + studentId, user);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (userId: any) => {
  try {
    const response = await axios.delete("localhost:3100/user/delete" + userId);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getUsers, createUser, updateUser, deleteUser };
