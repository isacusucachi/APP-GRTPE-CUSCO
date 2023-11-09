import { SessionsClient } from "dialogflow";
import User from "../models/User.js";

import { dialogflowConfig } from "../dialogflowConfig.js";

const dialogflowCredentials = {
  client_email: dialogflowConfig.client_email,
  private_key: dialogflowConfig.private_key,
};

// Configura la conexión a Dialogflow usando las credenciales de entorno
const sessionClient = new SessionsClient({
  credentials: dialogflowCredentials,
});
export const textQuery = async (req, res) => {
  try {
    const { text, user_id } = req.body;
    const userFound = await User.findById(user_id);
    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const session = sessionClient.sessionPath(dialogflowConfig.project_id, dialogflowConfig.session_id + user_id); // Reemplaza con tu proyecto ID y un ID de sesión único

    const request = {
      session,
      queryInput: {
        text: {
          text,
          languageCode: "es",
        },
      },
    };

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    res.status(200).json({
      intent: result.intent.displayName,
      userQuery: result.queryText,
      fullfillmentText: result.fulfillmentText,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Algo salió mal" });
  }
};
