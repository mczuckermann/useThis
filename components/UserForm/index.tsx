import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ADD_USER = gql`
  mutation addUser($user: UserInput) {
    addUser(user: $user) {
      _id
      username
      password
      date_joined
    }
  }
`;

const UserForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [addUser] = useMutation(ADD_USER, {
    refetchQueries: ["getAllUsers"],
  });

  return (
    <div>
      <h1>ADD USER</h1>
      <section>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const date_joined = new Date();
            addUser({
              variables: {
                user: {
                  username,
                  password,
                  date_joined,
                },
              },
            });
            setUsername("");
            setPassword("");
          }}
        >
          <div>
            <label htmlFor="username">Username:</label>
          </div>
          <input
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="username"
            style={{ marginBottom: "10px" }}
          />
          <div>
            <label htmlFor="password">Password:</label>
          </div>
          <input
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            style={{ marginBottom: "10px" }}
          />
          <div>
            <input
              type="submit"
              value="Submit"
              disabled={!username || !password}
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default UserForm;
