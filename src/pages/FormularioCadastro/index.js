import { useState } from "react";
import './formulariocadastro.css';
import { Link, useNavigate } from 'react-router-dom';
import api from "../../Api"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormularioCadastro = () =>{
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')
  const [permissao , setPermissao ] = useState('USER')
  const data = {nome, email, cpf, senha, permissao}
  const [cadastrar, setCadastrar] = useState('Cadastrar')
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(e);
try{
if(cpf != "" && nome != "" && email != "" && senha != ""){
    await api.post("/newuser", data).then(data=>{
      if (data.data.status == 200 ) {  navigate ('/') }
      else{toast.error(data.data.message)}
      setCadastrar('Cadastrar')
    })}
  
    else if (cpf == "" || nome == "" || email == "" || senha == "") {
      toast.warn("preencha todos os campos")
      setCadastrar('Cadastrar')
    }
  
  }

    catch (e) {
      setError(error.message);
      { toast.error("erro de comunicação com servidor") }

    }



  };




  
      return (
        <div className="formcontrol"> 
        
        <form className="formcadastro" onSubmit={handleSubmit}>
        <h5>Createaccount</h5>
       

          <label>
            Nome
            <input type="text" placeholder="Nome..."onChange={(e)=>{setNome(e.target.value)}} />
          </label>

          <label>
            CPF
          <input type="text" placeholder="cpf"onChange={(e)=>{setCpf(e.target.value)}} />
          </label>
          <label>
            Email
          <input type="email" placeholder="Email"onChange={(e)=>{setEmail(e.target.value)}} />
          </label>
          <label>
            Senha
          <input type="password" placeholder="Current Password"onChange={(e)=>{setSenha(e.target.value)}} />
          </label>
          
          <button className="buttonc"  type="submit"onClick={() => setCadastrar('Aguarde...')} >{cadastrar} </button>
          <div className="createaccount" >
           <p>Já tenho uma conta? <Link to="/login">Login</Link></p>
           
          </div>
        </form>
        <footer>
      <ToastContainer limit={1}/> 
      </footer>
       
        </div>
        
      );
    
  }

  export default FormularioCadastro;