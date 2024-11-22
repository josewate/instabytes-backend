import express from "express";
import multer from "multer";
import { listarPosts, publicarNovoPosts, uploadImagem } from "../controllers/postsController.js";

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
   
   // Rota para obter todos os posts
   app.get("/posts", listarPosts);

   app.post("/posts", publicarNovoPosts)

   app.post("/upload", upload.single("imagem"), uploadImagem);
}

export default routes;