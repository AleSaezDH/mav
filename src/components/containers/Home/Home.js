import React, { useState } from "react";
import axios from "axios";
import Error from "../../Error";
import UsersList from "../../UsersList";

function Home() {
  const errorsObject = {
    inputError: false,
    searchError: false,
  };
  const [errors, setErrors] = useState(errorsObject);
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState([]);
  const userNameLength = userName.length;

  const handleInputChange = (e) => {
    setUserName(e.target.value);
  };

  const searchUsers = async (e) => {
    e.preventDefault();
    if (userNameLength <= 3) {
      return setErrors({ ...errors, inputError: true });
    }
    try {
      let finalUserName = userName.replace(/\s+/g, ""); // elimina cualquier espacio en el nombre de usuario
      const { data } = await axios.get(
        `https://api.github.com/search/users?q=${finalUserName}`
      );
      const firstTenUsers = data.items.slice(0, 10); // la api no acepta limit por ende implemento slice
      setUserData(firstTenUsers);
      setErrors(errorsObject);
    } catch (error) {
      console.log("Error: ", error);
      setUserData([]);
      if (userNameLength >= 3) {
        setErrors({ inputError: false, searchError: true });
      } else {
        setErrors({ inputError: true, searchError: true });
      }
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
        {/* disabled={userNameLength <= 3 ? true : false} */}
      </form>

      {userData.length != 0 && <UsersList users={userData} />}

      {errors.inputError && <Error msge="Coloca al menos 4 caracteres" />}
      {errors.searchError && (
        <Error msge="No se han encontrado resultados para esa búsqueda" />
      )}
    </>
  );
}

export default Home;
