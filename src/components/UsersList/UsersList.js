import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Estilos
import "./styles.css";
import { Card, List, Avatar } from "antd";

function UsersList({ users }) {
  const gridStyle = {
    width: "100%",
    textAlign: "center",
  };

  return (
    <section className="userList-container">
      <Card style={{ minWidth: 500, maxWidth: 600 }}>
        <List
          itemLayout="horizontal"
          dataSource={users}
          renderItem={(user) => (
            <Card.Grid style={gridStyle}>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={user.avatar_url} />}
                  title={
                    <Link to={`/profile/${user.login}`} target="_blank">
                      {user.login}
                    </Link>
                  }
                  description={user.id}
                />
                <div>
                  <a href={user.html_url} target="_blank">
                    Ver GitHub
                  </a>
                </div>
              </List.Item>
            </Card.Grid>
          )}
        />
      </Card>
    </section>
  );
}

UsersList.propTypes = {
  users: PropTypes.object.isRequired,
};

UsersList.defaultProps = {
  users: {},
};

export default UsersList;
