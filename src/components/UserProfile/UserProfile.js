import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../Error";
import { searchProfileDetails } from "../../utils/endpoints";
import useErrors from "../../hooks/useErrors";
import useLoading from "../../hooks/useLoading";

function UserProfile() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const { errors, firstValidatorFunction, fourthValidatorFunction } =
    useErrors();
  const { loading, setLoading, Loading } = useLoading();

  const searchUser = async () => {
    const validatedUserName = firstValidatorFunction(id);
    if (
      validatedUserName.inputError.state ||
      validatedUserName.reactError.state
    )
      return;
    try {
      setLoading(true);
      const data = await searchProfileDetails(id);
      setUserData(data);
      setLoading(false);
    } catch (error) {
      console.log("Error: ", error);
      fourthValidatorFunction();
      setLoading(false);
    }
  };

  useEffect(() => {
    searchUser();
  }, [id]);

  return (
    <div>
      <h1>Perfil de Usuario</h1>

      {loading && <Loading />}

      <ul>
        <li>{userData.login}</li>
        <img src={userData.avatar_url} />
        <li>{userData.bio}</li>
      </ul>

      {errors.searchError.state && <Error msge={errors.searchError.msge} />}
      {errors.inputError.state && <Error msge={errors.inputError.msge} />}
      {errors.reactError.state && <Error msge={errors.reactError.msge} />}
    </div>
  );
}

export default UserProfile;
