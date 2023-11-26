import React,{useState} from "react";
import '../FormularioLogin/formulario.css';
import { Link } from 'react-router-dom';
import {useNavigate, redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../../Api"





function Formulario (){

  

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const data = {email, password }
  const [login, setLogin] = useState('Login')

  const handlelogin= async (e) => {
    e.preventDefault();
    setError('');
  
      await api.post("/login", data).then(data=>{  
        
      

        if (data.data.auth ) {localStorage.setItem('token', data.data.token, 'permissao') } 
        {sessionStorage.setItem('id', data.data.id)  } 
        {sessionStorage.setItem('permissao', data.data.permissao)  }  
      if(data.data.permissao == "ADM"){
         { navigate ('/cliente')}
      }else if (data.data.permissao == "USER" && (!sessionStorage.getItem("car"))) 
         { navigate (`/unicocliente/${data.data.id}`)}
         else if (data.data.permissao == "USER" ) 
         { navigate ('/cart')}

        else{toast.error(data.data.message) }
        setLogin('Login')
      })

    .catch (error=>{ toast.error("erro desconhecido!") }) 
      

    };


  
  

      return (
        <div className="formcontrollogin"> 
      
        <form className="formlogin" onSubmit={handlelogin} autocomplete="false">
        <h5>Login</h5>
          
          <label>
            Email
            <input  type="text" placeholder="Email..." autoComplete="Off" onChange={(e)=>{setEmail(e.target.value)}}/>
          </label>
          <label>
            Senha
          <input type="password" placeholder="Current Password"onChange={(e)=>{setPassword(e.target.value)}} />
          </label>
          
           
          <button className="buttonl"  type="submit" onClick={() => setLogin('Aguarde...')} > {login} </button>
        
          <div className="createaccount" >
           <p>Não tem uma conta? <Link className="link-formulariocadastro" to="/formulariocadastro">Cadastrar</Link></p>
           
          </div>
         
        </form>
        <ToastContainer limit={1}/> 
        </div>
      );
    
  }

  export default Formulario;