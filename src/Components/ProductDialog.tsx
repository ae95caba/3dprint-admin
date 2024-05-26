import React, { useRef, useContext, useState } from "react";
import TableContext from "../Contexts/ProductsContext";
import tryToModifyDbWithAuth from "../functions/tryToModifyDbWithAuth";

export function ProductDialog({ product }) {
  const dialogRef = useRef(null);
  const formRef = useRef(null);
  const {
    get_AndDo_,
    route,
    setDbProductsArr,
    productSchema,
    productKeys,
    dbProductsArr,
  } = useContext(TableContext);

  const isEditModeOn = product !== undefined;

  const [showDeleConfirmation, setShowDeleteConfirmation] = useState(false);

  const openDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };

  function handleSubmit(e) {
    e.preventDefault();

    const formElements = formRef.current.elements;

    const body = {}; // Initialize an empty object to hold the body data

    productKeys.forEach((key) => {
      let value;
      if (formElements[key].type !== "checkbox") {
        value = formElements[key].value ? formElements[key].value : undefined;
      } else {
        value = formElements[key].checked;
      }
      body[key] = value;
    });

    console.log(`body is :${JSON.stringify(body)}`);

    const settings = {
      route: route,
      id: isEditModeOn && product._id,
      method: isEditModeOn ? "PUT" : "POST",
      callback: () => {
        closeDialog();

        get_AndDo_(route, (response) => {
          setDbProductsArr(response.data);
        });
        e.target.reset();
      },
      body: JSON.stringify(body),
    };

    tryToModifyDbWithAuth(settings);
  }

  function deleteProduct() {
    const settings = {
      route: route,
      id: `${product._id}`,
      method: "DELETE",

      callback: () => {
        closeDialog();
        get_AndDo_(route, (response) => {
          setDbProductsArr(response.data);
        });
      },
    };

    tryToModifyDbWithAuth(settings);
  }

  return (
    <>
      <button onClick={openDialog}>
        {isEditModeOn ? "Editar" : "Agregar"}
      </button>

      <dialog className="crud" ref={dialogRef}>
        {showDeleConfirmation && (
          <div className="delete-comfirmation">
            <h2>Estas seguro?</h2>
            <div className="buttons-container">
              <button onClick={deleteProduct}>Aceptar</button>
              <button onClick={() => setShowDeleteConfirmation(false)}>
                cancelar
              </button>
            </div>
          </div>
        )}
        <form ref={formRef} onSubmit={handleSubmit}>
          {productSchema?.map((keySchema) => {
            function getInputType(keySchema) {
              if (keySchema.key === "createdTime") {
                return "date";
              }
              switch (keySchema.type) {
                case "String":
                  return "text";
                case "Number":
                  return "number";
                case "Boolean":
                  return "checkbox";
                // Add more cases as needed
                default:
                  return "text";
              }
            }
            /*      function getInputDefaultValue(schemaType) {
              if (!isEditModeOn || keySchema.type === "Boolean") {
                return undefined;
              }else if (keySchema.name === "createdTime"){
                //logic here
              }else{
                return product[keySchema.key]
              }
              switch (schemaType) {
                case "String":
                  return "text";
                case "Number":
                  return "number";
                case "Boolean":
                  return "checkbox";
                case "Date":
                  return "date";
                case "Email":
                  return "email";
                // Add more cases as needed
                default:
                  return "text";
              }
            } */
            const categories = dbProductsArr.map((product) => product.category);

            const isCategory = keySchema.key === "category";
            return (
              <label>
                {keySchema.key}
                <input
                  list={isCategory ? "category-list" : undefined}
                  name={keySchema.key}
                  type={getInputType(keySchema)}
                  placeholder={keySchema.key}
                  defaultValue={
                    keySchema.type !== "Boolean" && isEditModeOn
                      ? product[keySchema.key]
                      : undefined
                  }
                  defaultChecked={
                    keySchema.type === "Boolean" && isEditModeOn
                      ? product[keySchema.key]
                      : undefined
                  }
                  required={keySchema.required}
                />
                {isCategory && (
                  <datalist id="category-list">
                    {categories.map((category) => (
                      <option value={category} />
                    ))}
                  </datalist>
                )}
              </label>
            );
          })}

          <div className="buttons-container">
            {isEditModeOn && (
              <button
                type="button"
                className="delete"
                onClick={() => {
                  setShowDeleteConfirmation(true);
                }}
              >
                borrar
              </button>
            )}
            <button type="submit">Aceptar</button>

            <button type="button" onClick={closeDialog}>
              Cancelar
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
