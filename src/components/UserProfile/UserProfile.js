import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";
import Error from "../Error";

function UserProfile() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(false);

  const searchUser = async () => {
    try {
      const { data } = await axios.get(`https://api.github.com/users/${id}`);
      setUserData(data);
    } catch (error) {
      console.log("Error: ", error);
      setError(true);
    }
  };

  useEffect(() => {
    searchUser();
  }, [id]);

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      {Object.keys(userData).length == 0 && !error ? <Loading /> : null}
      <ul>
        <li>{userData.login}</li>
        <img src={userData.avatar_url} />
        <li>{userData.bio}</li>
      </ul>
      {error && (
        <Error msge="No hay resultados disponibles para esa búsqueda" />
      )}
    </div>
  );
}

export default UserProfile;
