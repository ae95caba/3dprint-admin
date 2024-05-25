import React, { useRef } from "react";

export default function UserDialog({
  handleResponse,
  action,
  dialogRef,

  h2,
  formId,
}) {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      }),
    };
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/users/${action}`, requestOptions);
    dialogRef.current.close();
    handleResponse(response, dialogRef);
  }

  return (
    <dialog ref={dialogRef} className="user">
      <div className="content">
        <h2>{h2}</h2>
        <form id={formId} onSubmit={handleSubmit}>
          <input
            ref={usernameRef}
            name="username"
            placeholder="username"
            required
          />

          <input
            ref={passwordRef}
            name="password"
            placeholder="password"
            required
          />
        </form>
        <div className="buttons-container">
          <button type="submit" form={formId}>
            Ok
          </button>
          <button
            onClick={() => {
              dialogRef.current.close();
            }}
          >
            Salir
          </button>
        </div>
      </div>
    </dialog>
  );
}
