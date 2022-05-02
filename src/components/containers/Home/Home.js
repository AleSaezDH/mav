import React, { useState } from "react";
import Error from "../../Error";
import UsersList from "../../UsersList";
import Loading from "../../Loading/Loading";
import { searchByUser } from "../../../utils/endpoints";
import useErrors from "../../../hooks/useErrors";
import useLoading from "../../../hooks/useLoading";

function Home() {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState([]);
  const {
    errors,
    resetErrorsState,
    firstValidatorFunction,
    secondValidatorFunction,
    thirdValidatorFunction,
  } = useErrors();
  const { loading, setLoading, Loading } = useLoading();

  const deleteSpacesInUserName = () => userName.replace(/\s+/g, ""); // elimina cualquier espacio en el nombre de usuario

  const handleInputChange = (e) => {
    setUserName(e.target.value);
    resetErrorsState();
  };

  const searchUsers = async (e) => {
    e.preventDefault();
    let finalUserName = deleteSpacesInUserName();
    const validatedUserName = firstValidatorFunction(finalUserName);
    if (
      validatedUserName.inputError.state ||
      validatedUserName.reactError.state
    )
      return;
    try {
      setLoading(true);
      let finalUserName = deleteSpacesInUserName();
      const data = await searchByUser(finalUserName);
      const firstTenUsers = data.items.slice(0, 10); // la api no acepta limit por ende implemento slice
      secondValidatorFunction(firstTenUsers);
      setUserData(firstTenUsers);
      setLoading(false);
    } catch (error) {
      console.log("Error: ", error);
      setUserData([]);
      thirdValidatorFunction(userName);
      setLoading(false);
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

      {loading && <Loading />}

      {userData.length != 0 && <UsersList users={userData} />}

      {errors.inputError.state && <Error msge={errors.inputError.msge} />}
      {errors.searchError.state && <Error msge={errors.searchError.msge} />}
      {errors.reactError.state && <Error msge={errors.reactError.msge} />}
    </>
  );
}

export default Home;
