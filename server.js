import express from "express";

const posts = [
   { id: 1, descricao: "Uma foto teste", imagem: "https://placekitten.com/200/200" },
   { id: 2, descricao: "Gato fazendo yoga", imagem: "https://placekitten.com/200/200" },
   { id: 3, descricao: "Gato fazendo panqueca", imagem: "https://placekitten.com/200/200" },
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
   console.log("Servidor escutando...");
});

app.get("/posts", (request, response) => {
   response.status(200).json(posts);
});

function buscarPostPorID(id) {
   return posts.findIndex((post) => {
      return post.id === Number(id);
   });
}

app.get("/posts/:id", (request, response) => {
   const index = buscarPostPorID(request.params.id);
   response.status(200).json(posts[index]);
});