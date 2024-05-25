import Swal from "sweetalert2";
const showSuccessAlert = () => {
  return Swal.fire({
    title: "Todo bien",
    text: "Los cambios se realizaron con éxito",
    icon: "success",
    confirmButtonText: "OK",
  });
};

const showConfirmAlert = (callback, settings) => {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      callback(settings);
    }
  });
};

const showWelcomeAlert = () => {
  return Swal.fire({
    title: "Bienvenido",
    text: "Que tenga un buen dia",
    icon: "success",
    confirmButtonText: "OK",
  });
};

const showNotLoggedAlert = () => {
  return Swal.fire({
    title: "Error!",
    text: "Debes estar logeado para realizar cambios.",
    icon: "warning", // Displays a warning icon
    confirmButtonText: "OK",
  });
};

const show_ErrorAlert = (string) => {
  return Swal.fire({
    title: "Error!",
    text: string,
    icon: "warning", // Displays a warning icon
    confirmButtonText: "OK",
  });
};

const showUnknownErrorAlert = (responseStatus) => {
  return Swal.fire({
    title: `Error ${responseStatus}`,
    text: "Contacta con un administrador",
    icon: "warning", // Displays a warning icon
    confirmButtonText: "OK",
  });
};

export {
  showSuccessAlert,
  showNotLoggedAlert,
  showUnknownErrorAlert,
  showWelcomeAlert,
  showConfirmAlert,
  show_ErrorAlert,
};
