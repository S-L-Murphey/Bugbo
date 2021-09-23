import React from "react";
import { Link, useHistory } from "react-router-dom";
import { register } from "../../utils/auth";
import "./Auth.css";


export const Register = (props) => {
  
  const firstName = React.createRef();
  const lastName = React.createRef();
  const email = React.createRef();
  const bio = React.createRef();
  const password = React.createRef();
  const verifyPassword = React.createRef();
  const passwordDialog = React.createRef();
  const avatar = React.createRef();
  const user_type = React.createRef();
  const username = React.createRef();

  const userTypes = [{
        id: 1,
        name: "Administrator",
        description: "Admins have global permissions with CRUD on all features."
    },
    {
        id: 2,
        name: "Developer",
        description: "Devs are able to create and update tickets. They can update projects. They have less permissions than admins but more than testers."
    },
    {
        id: 3,
        name: "Tester",
        description: "Testers can only create tickets and create, edit, and delete comments."
    }
]
  
  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        "username": username.current.value,
        "first_name": firstName.current.value,
        "last_name": lastName.current.value,
        "bio": bio.current.value,
        "email": email.current.value,
        "password": password.current.value,
        "avatar": avatar.current.value,
        "user_type": parseInt(user_type.current.value)
      };

      return register(newUser).then((success) => {
        if (success) {
          props.history.push("/");
        } else {
          window.alert("User already exists or could not be created.");
        }
      });
    } else {
      window.alert("Passwords do not match.");
    }
  };

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
        <fieldset>
          <label htmlFor="firstName"> First Name </label>
          <input
            ref={firstName}
            type="text"
            name="firstName"
            className="form-control"
            placeholder="First name"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="lastName"> Last Name </label>
          <input
            ref={lastName}
            type="text"
            name="lastName"
            className="form-control"
            placeholder="Last name"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="inputEmail"> Email address </label>
          <input
            ref={email}
            type="email"
            name="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </fieldset>

        <fieldset>
          <label htmlFor="username"> Username </label>
          <input
            ref={username}
            type="username"
            name="username"
            className="form-control"
            placeholder="Select a user name..."
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="inputPassword"> Password </label>
          <input
            ref={password}
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="inputAvatar"> Profile Picture </label>
          <input
            ref={avatar}
            type="avatar"
            name="avatar"
            className="form-control"
            placeholder="Avatar"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="verifyPassword"> Verify Password </label>
          <input
            ref={verifyPassword}
            type="password"
            name="verifyPassword"
            className="form-control"
            placeholder="Verify password"
            required
          />
        </fieldset>

        <fieldset>
          <label htmlFor="bio"> Add Bio </label>
          <input
            ref={bio}
            type="bio"
            name="bio"
            className="form-control"
            placeholder="Let others know a little bit about you..."
            required
          />
        </fieldset>



        <fieldset>
          <label htmlFor="user_type"> User Type </label>
          <select type="select" name="user_type" ref={user_type} required autoFocus className="form-control">
                        <option value="0">Select User Type</option>
                        {userTypes.map((element => {
                            return <option value={element.id}>
                                {element.name}
                            </option>
                        }))}
                    </select>
        </fieldset>

        <fieldset
          style={{
            textAlign: "center",
          }}
        >
          <button className="btn btn-1 btn-sep icon-send" type="submit">
            Register
          </button>
        </fieldset>
      </form>
      <section className="link--register">
        Already registered? <Link to="/login">Login</Link>
      </section>
    </main>
  );
};
