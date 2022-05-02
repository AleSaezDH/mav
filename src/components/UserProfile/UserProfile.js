import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchProfileDetails } from "../../utils/endpoints";
import useErrors from "../../hooks/useErrors";
import useLoading from "../../hooks/useLoading";

// Estilos
import "./styles.css";
import { Button } from "antd";

function UserProfile() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const { errors, firstValidatorFunction, fourthValidatorFunction, Error } =
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
    <section>
      {Object.keys(userData).length !== 0 && (
        <>
          <article className="userProfile-container">
            <ul className="data-container">
              <img src={userData.avatar_url} />
              <div className="li-container">
                <li>Nombre: {userData.name}</li>
                <li>Usuario de GitHub: {userData.login}</li>
                <li>Repositorios públicos: {userData.public_repos}</li>
                <li>Fecha de creación: {userData.created_at}</li>
              </div>
            </ul>
          </article>

          <article className="link-button">
            <Button type="primary">
              <a href={userData.html_url} target="_blank">
                Ver GitHub
              </a>
            </Button>
          </article>
        </>
      )}

      {loading && (
        <article className="loading-container">
          <Loading />
        </article>
      )}

      {errors.searchError.state && (
        <article className="errors-container">
          <Error msge={errors.searchError.msge} type="error" />
        </article>
      )}

      {errors.inputError.state && (
        <article className="errors-container">
          <Error msge={errors.inputError.msge} type="error" />
        </article>
      )}

      {errors.reactError.state && (
        <article className="errors-container">
          <Error msge={errors.reactError.msge} type="error" />
        </article>
      )}
    </section>
  );
}

export default UserProfile;
