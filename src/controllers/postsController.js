import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModels.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiServices.js";

export async function listarPosts(request, response) {
   // Obtém todos os posts usando a função getTodosPosts
   const posts = await getTodosPosts();
   
   // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON
   response.status(200).json(posts);
}

export async function publicarNovoPosts(request, response) {
   const novoPost =  request.body;
   try {
      const postCriado = await criarPost(novoPost);

      response.status(200).json(postCriado);
   } catch (error) {
      console.error(error.message);
      response.status(500).json({
         "Erro": "Falha na requisição!"
      });
   }
}

export async function uploadImagem(request, response) {
   const novoPost = {
      descricao: "",
      imgUrl: request.file.originalname,
      alt: ""
   };

   try {
      const postCriado = await criarPost(novoPost);
      const imgaemAtualizada = `uploads/${postCriado.insertedId}.png`
      fs.renameSync(request.file.path, imgaemAtualizada)
      response.status(200).json(postCriado);
   } catch (error) {
      console.error(error.message);
      response.status(500).json({
         "Erro": "Falha na requisição!"
      })
   }
}

export async function atualizarNovoPost(request, response) {
   const id = request.params.id;
   const urlImagem = `http://localhost:3000/${id}.png`;

   try {
      const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
      const descricao = await gerarDescricaoComGemini(imageBuffer);

      const post = {
         imgUrl: urlImagem,
         descricao: descricao,
         alt: request.body.alt
      }

      const postCrido = await atualizarPost(id, post);
      response.status(200).json(postCrido);
   } catch (error) {
      console.error(error.message);
      response.status(500).json({
         "Erro": "Falha na requisição!"
      });
   }
}