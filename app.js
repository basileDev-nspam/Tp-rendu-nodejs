import express from 'express'
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";
import 'dotenv/config'
import toursRouter from "./src/routes/tours.endpoints.js"
import usersRouter from "./src/routes/users.endpoints.js"
import connectDB from "./src/database-config/database.js";


const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.use("/api/v1/tours", toursRouter)
app.use("/api/v1/users", usersRouter)

app.get('/', (req, res) => {
    console.log("hello world")
    res.statusCode=200
    res.send("hello world")
})

const startServer = async () => {
    try {
        await connectDB();
        app.listen(8080, () => {
            console.log('App started on port 8080');
        });
    } catch (e) {
        console.error(`Unable to start app: ${e.message}`);
        process.exit(1);
    }
};

startServer();
