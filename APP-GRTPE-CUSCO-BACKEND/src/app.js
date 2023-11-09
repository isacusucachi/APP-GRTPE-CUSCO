import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cloudinary from "cloudinary";

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

import {
  PORT,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "./config.js";

// Routes
import indexRoutes from "./routes/index.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import carouselImageRoutes from "./routes/carouselImage.routes.js";
import usersRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import chatbotRoutes from "./routes/chatbot.routes.js";
import institutionalInformationRoutes from "./routes/institutionalInformation.routes.js";

const app = express();

// Settings
app.set("port", PORT || 4000);
app.set("json spaces", 4);

// Middlewares
app.use(
  cors({
    // origin: "http://localhost:3000",
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    // Error de sintaxis en JSON
    return res.status(400).json({ error: "JSON inválido" });
  }
  next();
});
app.use(express.urlencoded({ extended: false }));
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GRTPE APP API ",
      version: "1.0.0",
      description: "Documentation of GRTPE API",
    },
    components: {
      securitySchemes: {
        jwtToken: {
          type: "apiKey",
          in: "header",
          name: "x-access-token",
          description: "JWT token for authentication",
        },
      },
    },
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

// Routes
app.use("/api", indexRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/carouselImages", carouselImageRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/institutional-information", institutionalInformationRoutes);

app.use(
  "/api-doc",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);
app;

export default app;
