import React, { useState } from "react";
import axios from "axios";
import Error from "../../Error";
import UsersList from "../../UsersList";

function Home() {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    setError(false);
    setUserName(e.target.value);
  };

  const searchUsers = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://api.github.com/search/users?q=${userName}`
      );
      const firstTenUsers = data.items.slice(0, 10);
      setUserData(firstTenUsers);
    } catch (error) {
      console.log("Error: ", error);
      setError(true);
    }
  };

  return (
    <>
      <form onSubmit={searchUsers}>
        <input
          type="text"
          placeholder="Ej: Leandro"
          onChange={handleInputChange}
        />
        <input type="submit" />
      </form>

      {error && (
        <Error msge="No se han encontrado resultados para esa búsqueda" />
      )}

      {userData.length != 0 && <UsersList users={userData} />}
    </>
  );
}

export default Home;
