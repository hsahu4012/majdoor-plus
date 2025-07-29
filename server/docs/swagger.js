const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Majdoor+ API",
            version: "1.0.0",
            description: "Auto-generated Swagger docs for Majdoor+ backend"
        },
        servers: [
            { url: "http://localhost:5000/api" }
        ]
    },
    apis: ["./routes/*.js", "./models/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };