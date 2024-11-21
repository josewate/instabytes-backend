import express from "express";
import routes from "./src/routes/postsRoutes.js";

const app = express();
routes(app)

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor escutando na ${PORT}`);
});