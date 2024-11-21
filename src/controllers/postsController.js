import getTodosPosts from "../models/postsModels.js";


export async function listarPosts(request, response) {
   // Obtém todos os posts usando a função getTodosPosts
   const posts = await getTodosPosts();
   // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON
   response.status(200).json(posts);
}