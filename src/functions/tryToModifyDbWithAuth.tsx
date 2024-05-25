import React from "react";

import {
  showSuccessAlert,
  showNotLoggedAlert,
  showUnknownErrorAlert,
} from "../alerts";
import client from "../client";
import runBuild from "./runBuild";

interface Settings {
  route: string;
  id?: string;
  method: string;
  body?: string;
  callback: () => void;
}

async function tryToModifyDbWithAuth(settings: Settings) {
  const { route, id, method, body, callback } = settings;

  try {
    const token = JSON.parse(localStorage.getItem("jwtToken")).token;
    const response = await client({
      method: method,
      url: `${route}${id ? `/${id}` : ""}`,
      data: body,
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 403) {
      showNotLoggedAlert();
    } else if (response.status !== 200) {
      showUnknownErrorAlert(response.status);
    } else {
      showSuccessAlert();
      //run build
      if (process.env.NODE_ENV == "production") {
        runBuild();
      }
    }
  } catch (error) {
    console.log(`error ms is:${error.message}`);

    if (error.message === "Cannot read properties of null (reading 'token')") {
      showNotLoggedAlert();
    }
  }

  callback();
}

export default tryToModifyDbWithAuth;
