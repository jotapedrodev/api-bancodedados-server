import {getTodosPosts , createPost, atualizarPost} from "../models/postModels.js";
import fs from "fs"

import gerarDescricaoComGemini from "../services/serviceGemni.js"

export async function listarPosts (req, res) {
     
        // Chama a função para buscar os posts e armazena o resultado.
        const posts = await getTodosPosts();
        // Envia os posts como resposta em formato JSON com status 200 (sucesso).
        res.status(200).json(posts);
      } 
    
export async function postarNovoPost(req, res) { 
  const novoPost = req.body;
  try {
    const postCriado = await createPost(novoPost)
    res.status(200).json(postCriado); 
  }catch(erro) { 
      console.error(erro.message);
      res.status(500).json({"Erro":"Falha na requisição"})
  }
  
}

export async function uploadImagem(req, res) { 
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
  }

try{
  const postCriado = await createPost(novoPost)
  const imgAtualizada = `uploads/${postCriado.insertedId}.png`
    fs.renameSync(req.file.path, imgAtualizada)
    res.status(200).json(postCriado); 
  }catch(erro) { 
      console.error(erro.message);
      res.status(500).json({"Erro":"Falha na requisição"})
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`
 
  try {
    
    const imageBuffer = fs.readFileSync(`uploads/${id}.png`)
    const descricao = await gerarDescricaoComGemini(imageBuffer)
    
    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt
    }
    
    const postCriado = await atualizarPost(id, post);
    
    res.status(200).json(postCriado); 
  }catch(erro) { 
      console.error(erro.message);
      res.status(500).json({"Erro":"Falha na requisição"})
  
 }
}