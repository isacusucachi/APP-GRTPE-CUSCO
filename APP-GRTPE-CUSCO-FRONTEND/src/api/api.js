import axios from "axios";
import { Alert } from "react-native"; // Importa Alert desde React Native

const api = axios.create({
  baseURL: "https://app-grtpe-cusco-api-zs8a-dev.fl0.io/api",
});

// Función para verificar la conexión a Internet
const checkInternetConnection = async () => {
  try {
    await axios.get("https://www.google.com"); // Intenta hacer una solicitud a un servidor conocido
    return true; // Si la solicitud tiene éxito, hay conectividad a Internet
  } catch (error) {
    return false; // Si hay un error en la solicitud, no hay conectividad a Internet
  }
};

// Función para mostrar un mensaje de alerta cuando no hay conexión a Internet
const showAlertNoInternet = () => {
  Alert.alert(
    "No hay conexión a Internet",
    "Por favor, conéctese a Internet y vuelva a intentarlo."
  );
};

export const getCarruselImages = async (token) => {
  const isConnected = await checkInternetConnection();

  if (!isConnected) {
    showAlertNoInternet();
    return Promise.reject("No hay conexión a Internet");
  }
  return api
    .get("/carouselImages", {
      headers: { "x-access-token": token },
    })
    .then((response) => response.data)
    .catch((error) => {
      const message = error.response?.data?.message || "Algo salió mal";
      throw new Error(message);
    });
};

export const getInstitutionalInformation = async (token) => {
  const isConnected = await checkInternetConnection();

  if (!isConnected) {
    showAlertNoInternet();
    return Promise.reject("No hay conexión a Internet");
  }
  return api
    .get("/institutional-information", {
      headers: { "x-access-token": token },
    })
    .then((response) => response.data)
    .catch((error) => {
      const message = error.response?.data?.message || "Algo salió mal";
      throw new Error(message);
    });
};

export const getServices = async (token) => {
  const isConnected = await checkInternetConnection();

  if (!isConnected) {
    showAlertNoInternet();
    return Promise.reject("No hay conexión a Internet");
  }
  return api
    .get("/services", {
      headers: { "x-access-token": token },
    })
    .then((response) => response.data)
    .catch((error) => {
      const message = error.response?.data?.message || "Algo salió mal";
      throw new Error(message);
    });
};

export const signIn = async (data) => {
  const isConnected = await checkInternetConnection();

  if (!isConnected) {
    showAlertNoInternet();
    return Promise.reject("No hay conexión a Internet");
  }
  return api
    .post("/auth/signin", data)
    .then((response) => response)
    .catch((error) => {
      const message = error.response?.data?.message || "Algo salió mal";
      throw new Error(message);
    });
};

export const signUp = async (data) => {
  const isConnected = await checkInternetConnection();

  if (!isConnected) {
    showAlertNoInternet();
    return Promise.reject("No hay conexión a Internet");
  }
  return api
    .post("/auth/signup", data)
    .then((response) => response)
    .catch((error) => {
      const message = error.response?.data?.message || "Algo salió mal";
      throw new Error(message);
    });
};

export const getUser = async (id, token) => {
  const isConnected = await checkInternetConnection();

  if (!isConnected) {
    showAlertNoInternet();
    return Promise.reject("No hay conexión a Internet");
  }
  return api
    .get(`/users/${id}`, {
      headers: { "x-access-token": token },
    })
    .then((response) => response.data)
    .catch((error) => {
      const message = error.response?.data?.message || "Algo salió mal";
      throw new Error(message);
    });
};

// Helper function to verify if the user is logged in
export const verifyLogin = async (token) => {
  const isConnected = await checkInternetConnection();

  if (!isConnected) {
    showAlertNoInternet();
    return Promise.reject("No hay conexión a Internet");
  }
  try {
    const response = await api.get("/verify", {
      headers: { "x-access-token": token },
    });
    // If the server returns a 200 status code, the user is authenticated
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    // If there's an error, the user is not authenticated
    console.error(error);
  }
  return false;
};

export const changeUserPassword = async ({ id, token, data }) => {
  const isConnected = await checkInternetConnection();

  if (!isConnected) {
    showAlertNoInternet();
    return Promise.reject("No hay conexión a Internet");
  }
  return api
    .put(`/users/${id}/update-password`, data, {
      headers: { "x-access-token": token },
    })
    .then((response) => response)
    .catch((error) => {
      const message = error.response?.data?.message || "Algo salió mal";
      throw new Error(message);
    });
};

export const getServiceDetails = async (token, serviceID) => {
  const isConnected = await checkInternetConnection();

  if (!isConnected) {
    showAlertNoInternet();
    return Promise.reject("No hay conexión a Internet");
  }
  return api
    .get(`/services/${serviceID}/details`, {
      headers: { "x-access-token": token },
    })
    .then((response) => response.data)
    .catch((error) => {
      const message = error.response?.data?.message || "Algo salió mal";
      throw new Error(message);
    });
};

export const forgotPassword = async (data) => {
  const isConnected = await checkInternetConnection();

  if (!isConnected) {
    showAlertNoInternet();
    return Promise.reject("No hay conexión a Internet");
  }
  return api
    .post("/auth/forgot-password", data)
    .then((response) => response)
    .catch((error) => {
      const message = error.response?.data?.message || "Algo salió mal";
      throw new Error(message);
    });
};

export const verifyResetPasswordToken = async (data) => {
  const isConnected = await checkInternetConnection();

  if (!isConnected) {
    showAlertNoInternet();
    return Promise.reject("No hay conexión a Internet");
  }
  return api
    .post("/auth/verify-reset-password-token", data)
    .then((response) => response)
    .catch((error) => {
      const message = error.response?.data?.message || "Algo salió mal";
      throw new Error(message);
    });
};

export const resetPassword = async (data) => {
  const isConnected = await checkInternetConnection();

  if (!isConnected) {
    showAlertNoInternet();
    return Promise.reject("No hay conexión a Internet");
  }
  return api
    .put("/auth/reset-password", data)
    .then((response) => response)
    .catch((error) => {
      const message = error.response?.data?.message || "Algo salió mal";
      throw new Error(message);
    });
};

export const getDialogflowConfig = async (token) => {
  const isConnected = await checkInternetConnection();

  if (!isConnected) {
    showAlertNoInternet();
    return Promise.reject("No hay conexión a Internet");
  }
  return api
    .get("/dialogflow-config", {
      headers: { "x-access-token": token },
    })
    .then((response) => response.data)
    .catch((error) => {
      const message = error.response?.data?.message || "Algo salió mal";
      throw new Error(message);
    });
};

export const chatWithChatBot = async (data) => {
  const isConnected = await checkInternetConnection();

  if (!isConnected) {
    showAlertNoInternet();
    return Promise.reject("No hay conexión a Internet");
  }
  return api
    .post("/chatbot/text-query", data)
    .then((response) => response)
    .catch((error) => {
      const message = error.response?.data?.message || "Algo salió mal";
      throw new Error(message);
    });
};
