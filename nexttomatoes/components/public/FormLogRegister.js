import React, { useState } from "react";
import * as Components from "./Components";
import { accountService } from "../../_service";
import info from "../../_helpers/Statut";
import Link from "next/link";
import Router from "next/router";

const FormLogRegister = () => {
  const [signIn, toggle] = React.useState(true);

  const [credentials, setCredentials] = useState([]);
  const [user, setUser] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const onChange = (e) => {
    console.log(e.target.value);
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    accountService
      .login(credentials)

      .then((res) => {
        accountService.saveToken(res.data.user._id);
        info.statut = res.data.user.status;
        info.name = res.data.user.name;
        localStorage.setItem("name", info.name);
        console.log(info.statut);
        localStorage.setItem('statut', info.statut)
        Router.push("/");
      })
      .catch((error) => console.log(error));
  };

  const onChangeregister = (e) => {
    console.log(e.target.value);
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitregister = (e) => {
    e.preventDefault();

    accountService
      .register(user)
      .then((res) => {
        console.log(res);
        setSuccessMessage(
          "Inscription réussie, clique sur SIGN IN pour te connecter.!"

        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <Components.Button>
          <Link href="/">Home</Link>
        </Components.Button>
      </div>

      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form onSubmit={onSubmitregister}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input
              name="name"
              type="text"
              placeholder="Name"
              value={user.name}
              onChange={onChangeregister}
            />
            <Components.Input
              name="email"
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={onChangeregister}
            />
            <Components.Input
              name="password"
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={onChangeregister}
            />
            <Components.Input
              name="status"
              type="hidden"
              placeholder="status"
              value={(user.status = "user")}
            />

            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}

            <Components.Button>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form onSubmit={onSubmit}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input
              name="email"
              type="email"
              placeholder="Email"
              value={credentials.email}
              onChange={onChange}
            />
            <Components.Input
              name="password"
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={onChange}
            />
            <Components.Anchor href="#">
              Forgot your password?
            </Components.Anchor>
            <Components.Button>Sigin In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter Your personal details and start journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sigin Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
};
export default FormLogRegister;
