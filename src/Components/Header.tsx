import React, { useState, useRef, useContext } from "react";
import { show_ErrorAlert, showWelcomeAlert } from "../alerts";

import LogoutButton from "./LogoutButton";
import UserContext from "../Contexts/UserContext";
import logo from "../assets/logo-white.png";
import UserDialog from "./UserDialog";

export default function Header() {
  console.log(`NODE_ENV es : ${process.env.NODE_ENV}`);
  const { isUserOnline, setIsUserOnline } = useContext(UserContext);
  const signupDialogRef = useRef(null);
  const signinDialogRef = useRef(null);
  const tabs = (
    <ul>
      {isUserOnline ? (
        <li>
          <LogoutButton setIsUserOnline={setIsUserOnline} />
        </li>
      ) : (
        <>
          {process.env.NODE_ENV !== "production" && (
            <li>
              <button
                onClick={() => {
                  signupDialogRef.current.showModal();
                }}
              >
                Crea una cuenta
              </button>
            </li>
          )}
          <li>
            <button
              onClick={() => {
                signinDialogRef.current.showModal();
              }}
            >
              Inicia sesión
            </button>
          </li>
        </>
      )}
      <li>
        <a
          href="https://dulce-tentacion-mp.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tienda
        </a>
      </li>
    </ul>
  );

  async function handleSigninResponse(response) {
    if (response.ok) {
      const token = await response.json();

      // Convert the JWT token to a string
      const tokenString = JSON.stringify(token);

      // Save the JWT token string to local storage
      localStorage.setItem("jwtToken", tokenString);
      setIsUserOnline(true);

      showWelcomeAlert();
    } else {
      if (response.status === 404) {
        show_ErrorAlert("Usuario no encontrado");
        // user not found
      }
      if (response.status === 401) {
        //user found but the password doesnt match

        show_ErrorAlert("Contrasenia incorrecta");
      }
    }
  }

  async function handleSignunResponse(response) {
    if (response.ok) {
      alert("Account created successfully!");
    } else {
      const errorMessage = await response.text(); // Attempt to read the error message from the response
      alert(
        `Error: ${response.status} - ${errorMessage || response.statusText}`
      );
    }
  }
  return (
    <section id="header">
      <UserDialog
        dialogRef={signupDialogRef}
        h2={"Crear cuenta"}
        action={"signup"}
        formId={"signup"}
        handleResponse={handleSignunResponse}
      />
      <UserDialog
        dialogRef={signinDialogRef}
        h2={"Inicia sesión"}
        action={"signin"}
        formId={"signin"}
        handleResponse={handleSigninResponse}
      />
      <img
        className="logo"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        src={logo}
        alt=""
      />

      <nav>{tabs}</nav>

      <input type="checkbox" id="checkbox" />

      <aside>{tabs}</aside>
      <label className="burger-menu" htmlFor="checkbox"></label>
    </section>
  );
}
