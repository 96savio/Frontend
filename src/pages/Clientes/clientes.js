import api from "../../Api"
import { useState, useEffect } from 'react';
import './clientes.css';
import { BsSearch } from "react-icons/bs";
import { GrFormEdit, GrFormTrash, GrFormAdd } from "react-icons/gr";
import { BsJustify, BsXLg } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate, redirect } from 'react-router-dom';
function Clientes() {

  const [input, setInput] = useState('')
  const [cliente, setCliente] = useState([])
  const [todosclientes, setTodosclientes] = useState([])
  const [todosclientes2, setTodosclientes2] = useState([])
  const [ide, setId] = useState('')
  const [cpf, setCpf] = useState('')
  const [id, setID] = useState('')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [permissao, setPermissao] = useState('')
  const data = { cpf, nome, email }
  const [error, setError] = useState('')
  const [user, setUser ] = useState('')
  const [autenticado, setAutenticado ] = useState(false)
  const navigate = useNavigate()
 



 // para definir nome do usuario da sessão
 useEffect(() => {
  { var id = sessionStorage.getItem('id')}

  api.get(`/unicocliente/${id}`, {
    headers: {
      'x-acess-token': localStorage.getItem("token")
      
    }
  
  })
    .then(res => setUser(res.data.nome))
   
    

}, [id]);


// verify ADM
/*
  useEffect(() => {
  { var id = sessionStorage.getItem('id')}
  api.get(`/unicocliente/${id}`, {
    headers: {
      'x-acess-token': localStorage.getItem("token")
      
    }
  
  })
    .then(res => setPermissao(res.data.permissao))
   
    
if(permissao != "ADM"){
  { navigate ('/')}
}
}, [id]);
*/
  // drop down
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show)
  const closeMenu = () => setShow(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(e);
    try {
      if (cpf != "" && nome != "" && email != "") {
        await api.post("/clientes", data)
      }
      if (Response.post = true && cpf  != "" && nome != "" && email != "") {
      toast.success("cadastro realizado com sucesso!")
    }
      else if (cpf == "" || nome == "" || email == "") {
        toast.warn("preencha todos os campos")
      }

    }
    catch (e) {
      setError(error.message);
      { toast.error("erro de comunicação com servidor") }

    }



  };




const logout = ()=>{
  {localStorage.removeItem('token')}
  { navigate ('/')}
}





  useEffect(() => {
    api.get(`todosclientes`,{
      headers:{
        'x-acess-token': localStorage.getItem("token") 
    }} ).then(res => {
      
      setTodosclientes(res.data)
      
    })
  }, []);


// verifica se tem token para poder acessar a pagina

if (!localStorage.getItem("token")) {{ navigate('/') } }




  //funcão de pesquisa de cliente
  async function handleSearch() {
    if (input === '' || setCliente.cliente === '') {
      toast.warn('Preencha o cpf')
      return
    }

    try {
      const response = await api.get(`/unicoclientecpf/${input}`,{
        headers:{
          'x-acess-token': localStorage.getItem("token") 
      }}
      
      )
      setCliente(response.data)

      setInput('')

    } catch (error) {
      toast.error('Não encontrado')
      setInput('')
      return
    }
  }

  //deletar cliente

  async function handleDelete(id) {
    const deletando = await api.delete(`/deletecliente/${id}`)
    if (Response.delete = true ) { toast.success(`Cliente: ${nome} deletado`) }
  }


  return (
    <div className="clientes-all">
        
      <div className="wrap-nav-clientes">
        <div id="dropdown-2">
          {show ? < BsXLg className="close" onClick={handleShow} /> :
            <BsJustify className="open" onClick={handleShow} />}
        </div>
        
        <ul className={show ? 'nav-clientes' : 'menu-disable-clientes'} >
       
          <Link to="/">inicio</Link>
          <Link to="/adicionarcliente">Adicionar Cliente</Link>
          <Link to="/adicionarproduto">Adicionar Produto</Link>
          <div className="logout-clientes">
          <AiOutlineUser className="logout-icon-clientes"/><span className="logout-user-clientes">  {user} 
          <button  className="logout-button" type="submit" onClick={logout} > sair </button>
          </span>
       
       
        </div>
        </ul >
      </div>
      <div className="resultsearch">




        <div className="results">
          
          <form >
          <div className="pesquisar">
            <input className="searchclient"
              type="tel"
              placeholder="Pesquisar CPF"
              value={input}
              onChange={e => setInput(e.target.value)}
              maxlength="11"
              minlength="0"
            >

            </input>
            <i onClick={handleSearch} className="buttonSearch"><BsSearch /></i>


          </div>

            <input className="editar"
              placeholder="CPF"
              value={cliente.cpf}
              onChange={e => setCpf(e.target.value)}

            >

            </input>

            <input className="editar"
              placeholder="nome"
              value={cliente.nome}
              onChange={e => setNome(e.target.value)}


            >


            </input>

            <input className="editar"
              placeholder="email"
              value={cliente.email}
              onChange={e => setEmail(e.target.value)}
            >
            </input>
            <div className="icon">

             
              <Link to={`/editarcliente/${cliente.id}`}><i className="icones" > <GrFormEdit /></i></Link>
              <i className="icones" onClick={() => handleDelete(cliente.id)}><GrFormTrash /></i>

            </div>
          </form>



        </div>
      </div>



      {todosclientes && (
        <table className="table">
          <thead>
            <tr>
            <th>ID</th>
              <th>Cpf</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Permissao</th>
              <th className="alteracões">Editar/exluir</th>

            </tr>
          </thead>
          <tbody>
            {todosclientes.map((todos, index) => (
              <tr className="a" key={todos.id}>
                 <td className="id">{todos.id}</td>
                 <td className="cpf">{todos.cpf}</td>
                <td className="nome">{todos.nome}</td>
                <td className="email">{todos.email}</td>
                <td className="grupo">{todos.permissao}</td>
                <td className="edit" >
                  <Link className="icones" to={`/editarcliente/${todos.id}`}><i className="icones" > <GrFormEdit /></i></Link>
                  <i className="icones" onClick={() => handleDelete(todos.id)}><GrFormTrash /></i>

                </td>

              </tr>
            ))}
          </tbody>

        </table>)}



      <footer>
      <ToastContainer/> 
      </footer>
    </div>

  )
};

export default Clientes;