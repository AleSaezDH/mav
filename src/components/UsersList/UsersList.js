import React from "react";
import { Link } from "react-router-dom";

function UsersList({ users }) {
  return (
    <div>
      <h1>Resultados de la Búsqueda</h1>
      {users.map((user) => {
        return (
          <ul key={user.id}>
            <Link to={`/profile/${user.login}`}>Usuario: {user.login}</Link>
            <li>Id: {user.id}</li>
          </ul>
        );
      })}
    </div>
  );
}

export default UsersList;
