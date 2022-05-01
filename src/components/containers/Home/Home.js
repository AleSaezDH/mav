import React, { useState } from "react";
import axios from "axios";
import Error from "../../Error";
import UsersList from "../../UsersList";
import Loading from "../../Loading/Loading";

function Home() {
  const errorsObject = {
    inputError: false,
    searchError: false,
    reactError: false,
  };
  const [errors, setErrors] = useState(errorsObject);
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userNameLength = userName.length;

  const handleInputChange = (e) => {
    setUserName(e.target.value);
    setErrors(errorsObject);
  };

  const searchUsers = async (e) => {
    e.preventDefault();
    if (userNameLength <= 3) {
      return setErrors({ ...errors, inputError: true });
    } else if (userName == "react") {
      return setErrors({ ...errors, reactError: true });
    }
    try {
      setLoading(true);
      let finalUserName = userName.replace(/\s+/g, ""); // elimina cualquier espacio en el nombre de usuario
      const { data } = await axios.get(
        `https://api.github.com/search/users?q=${finalUserName}`
      );
      const firstTenUsers = data.items.slice(0, 10); // la api no acepta limit por ende implemento slice
      if (firstTenUsers.length === 0) {
        setErrors({ ...errors, searchError: true });
      } else {
        setErrors(errorsObject);
      }
      setUserData(firstTenUsers);
      setLoading(false);
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
      {errors.reactError && <Error msge="No puedes buscar la palabra react" />}

      {loading && <Loading />}
    </>
  );
}

export default Home;
