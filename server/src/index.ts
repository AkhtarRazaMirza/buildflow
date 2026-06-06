import { createApp } from "./config/server.js"
import dotenv from "dotenv";
import { db } from "./config/db.js";
dotenv.config();

async function startServer() {
    console.log("Starting server...");
    const PORT = process.env.PORT;
    const app = createApp();
    try {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}...`);
        });
        db
        console.log("database is connect successfully..");
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

startServer();