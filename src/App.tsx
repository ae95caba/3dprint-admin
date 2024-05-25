import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import React, { useState, useEffect } from "react";
import UserContext from "./Contexts/UserContext";
import { showSuccessAlert } from "./alerts";
import Swal from "sweetalert2";

function App() {
  const [isUserOnline, setIsUserOnline] = useState(false);

  async function checkTokenValidityAndSetUserOnlineStatus(token) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`, // Add the JWT to the Authorization header
      },
    };
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/users/auth`, requestOptions);
      if (!response.ok) {
        setIsUserOnline(false);
        console.log(response.status);

        throw new Error("Request failed");
      }
      console.log("auth succeded, setting user state to online!");
      setIsUserOnline(true);

      // Process the data or perform other operations
    } catch (error) {
      console.error("Error:", error.message);
      setIsUserOnline(false);
    }
  }

  //at page load
  //if token at localStorage
  ////////use server to check it
  ////////if valid
  //////////////set isUserOnline to true
  useEffect(() => {
    const token = localStorage.getItem("jwtToken")
      ? JSON.parse(localStorage.getItem("jwtToken"))?.token
      : undefined;

    if (token) {
      // check if token is valid

      checkTokenValidityAndSetUserOnlineStatus(token);
    } else {
      setIsUserOnline(false);
    }
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          isUserOnline,
          setIsUserOnline,
        }}
      >
        <Header />
        <Main />
        <Footer />
      </UserContext.Provider>
    </>
  );
}

function Main() {
  return (
    <main>
      <Home />
    </main>
  );
}

export default App;
