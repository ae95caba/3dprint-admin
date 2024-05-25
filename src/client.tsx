import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const client = axios.create({
  baseURL: apiUrl,
  headers: {
    common: {
      /*   'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Encabezado de autorización */
      "Content-Type": "application/json", // Tipo de contenido predeterminado
    },
  },
});

export default client;
