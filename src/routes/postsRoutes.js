import express from "express";
import multer from "multer";
import cors from "cors";
import { atualizarNovoPost, listarPosts, publicarNovoPosts, uploadImagem } from "../controllers/postsController.js";

const corsOptions = {
   origin: "http://localhost:8000",
   optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
   destination: function (request, file, cb) {
      cb(null, 'uploads/');
   },
   filename: function (request, file, cb) {
      cb(null, file.originalname);
   }
});

const upload = multer({ storage: storage });

const routes = (app) => {
   // Habilita o parser JSON para lidar com requisições JSON
   app.use(express.json());
   
   app.use(cors(corsOptions))
   // Rota para obter todos os posts
   app.get("/posts", listarPosts);

   app.post("/posts", publicarNovoPosts)

   app.post("/upload", upload.single("imagem"), uploadImagem);

   app.put("/upload/:id", atualizarNovoPost);
}

export default routes;