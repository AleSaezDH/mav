import axios from "axios";

export const searchByUser = async (user) => {
  const { data } = await axios.get(
    `https://api.github.com/search/users?q=${user}`
  );
  return data;
};

export const searchProfileDetails = async (user) => {
  const { data } = await axios.get(`https://api.github.com/users/${user}`);
  return data;
};
