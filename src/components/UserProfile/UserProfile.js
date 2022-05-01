import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UserProfile() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});

  const searchUser = async () => {
    try {
      const { data } = await axios.get(`https://api.github.com/users/${id}`);
      setUserData(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    searchUser();
  }, [id]);

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <ul>
        <li>{userData.login}</li>
        <img src={userData.avatar_url} />
      </ul>
    </div>
  );
}

export default UserProfile;
