import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"

const app= express()
const prisma = new PrismaClient()
 
app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.send("Cadastro de usuários")
})


/* nessa rota eu estou listando todos os meus usuários no banco de dados*/

app.get("/usuarios" , async(req, res)=>{
    
    const user= await prisma.user.findMany()

    res.status(200).json(user)
})


  

/* nessa rota eu estou criando usuários novos no banco de dados*/

app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})


/* nessa rota eu estou editado um usuário no banco de dados e filtrando pelo id
para dizer para o banco de dados quem eu quero editar */

app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
         
        where:{
           id: req.params.id
        },


        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(200).json(req.body)
})


/* nessa rota eu estou deletado um usuário do banco de dados e filtrando pelo id 
para dizer pro banco de dados quem eu quero deletar !

*/

app.delete("/usuarios/:id", async (req,res)=>{
    
    await prisma.user.delete({
       where:{
        id: req.params.id
       }

    })

    res.status(200).json({message: "Usuário deletado com sucesso!"})
})



app.listen(3001, ()=>{
    console.log("Sevidor em execução na porta http://localhost:3001/")
})