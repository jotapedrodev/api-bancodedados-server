import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controller/postsController.js";

const corsOptions = {
    origin: "http://localhost8000",
    optionsSuccesStatus: 200
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})



const routes = (app) => {
 // Permite que o servidor receba dados no formato JSON.
app.use(express.json());  
// Rota GET para buscar todos os posts.
app.use(cors(corsOptions))
app.get("/posts", listarPosts);
//rota para criar post .post
app.post("/posts", postarNovoPost) 
app.post("/upload", upload.single("imagem"), uploadImagem);

app.put("/upload:id", )
};

export default routes;