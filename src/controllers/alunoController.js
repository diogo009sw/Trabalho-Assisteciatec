import serviceAluno from "../services/serviceAluno.js";
async function Listar(req, res){
    const alunos = await serviceAluno.Listar();
    res.status(200).json({alunos});        
}

async function Inserir(req, res) {
    const {matricula, nome, sobrenome} = req.body;     
    const aluno = await serviceAluno.Inserir(matricula, nome, sobrenome) 
    res.status(201).json({"mensagem":"sucesso"}) 
}

async function Editar(req, res) {
    const id = req.params.id;
    const {nome, sobrenome} = req.body;     
    const aluno = await serviceAluno.Editar(id, nome, sobrenome) 
    res.status(200).json(aluno) 
}

async function Excluir(req, res) {
    const id = req.params.id;
        
    const aluno = await serviceAluno.Excluir(id) 
    res.status(200).json(aluno) 
}

export default {Listar, Inserir, Editar, Excluir}