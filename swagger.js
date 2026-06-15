import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Natours API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"], // <— where your JSDoc comments live
};

export const swaggerSpec = swaggerJsdoc(options);
