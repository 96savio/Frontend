import api from "../../Api"
import { useState } from "react";
import './newcliente.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Newclient() {
  const [error, setError] = useState('')

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')
  const [permissao, setPermissao] = useState('')
  const data = { nome, email, cpf, senha, permissao }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post("/newuser", data)
      if (Response.data.message ='cadastrado com sucesso') { toast.success("cadastro realizado com sucesso!") }
      else if (!Response.data) { toast.warn("Preencha todos os campos") }

    }

    catch (e) {
      setError(error.message);
      { toast.warn(Response.message) }

    }


  };





  return (
    <div className="formcontrol-addcliente">
      <h5>Createclient</h5>
      <form className="formcadastro-newcliente" onSubmit={handleSubmit}>



        <label>
          Nome
          <input type="text" placeholder="Nome..." onChange={(e) => { setNome(e.target.value) }} />
        </label>

        <label>
          CPF
          <input type="text" placeholder="cpf" onChange={(e) => { setCpf(e.target.value) }} />
        </label>
        <label>
          Email
          <input type="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
        </label>
        <label>
          Senha
          <input type="password" placeholder="Current Password" onChange={(e) => { setSenha(e.target.value) }} />
        </label>
        <label>

          <label for="permissao"></label>
          
          <select className="Grupo" name="Grupo" onChange={(e) => { setPermissao(e.target.value) }} >
            <option value="USER">USER</option>
            <option value="ADM">ADM</option>


          </select>
         
        </label>
        <button className="button" type="submit" onClick={handleSubmit}>Cadastrar</button>

      </form>
      <Link to="/cliente">Voltar</Link>
      <ToastContainer limit={1}/> 
    </div>
  )
};

export default Newclient;