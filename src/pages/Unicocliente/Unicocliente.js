import api from "../../Api"
import { useState, useEffect } from 'react';
import './unicocliente.css';
import { BsSearch } from "react-icons/bs";
import { GrFormEdit, GrFormTrash, GrFormAdd } from "react-icons/gr";
import { BsJustify, BsXLg } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, redirect } from 'react-router-dom';
function Unicocliente() {

  const URL = `http://localhost:5000/files/`

  const [nome, setNome] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()
  const [pedidos, setPedidos] = useState([])
  

  // drop down
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show)
  const closeMenu = () => setShow(false)


  // remove token e redireciona para home
  const logout = () => {
    { localStorage.removeItem('token') }
    { navigate('/') }
  }


// verifica se tem token para poder acessar a pagina

  if (!localStorage.getItem("token")) {{ navigate('/') } }

  // para definir nome do usuario da sessão
  useEffect(() => {
    api.get(`/unicocliente/${id}`, {
      headers: {
        'x-acess-token': localStorage.getItem("token")
      }
    
    })
      .then(res => setNome(res.data.nome)  )
      

  }, [id]);

 

  // para retornar os pedidos do usuario da sessão
  useEffect(() => {
    api.get(`/pedidoscliente/${id}`, {
      headers: {
        'x-acess-token': localStorage.getItem("token")
      }
      
    }).then((res) => setPedidos([...res.data]) )
    
    
  }, [id]);




  return (

    
    <div  className="clientes">

      <div className="wrap-nav">
        <div id="dropdown">
          {show ? < BsXLg className="close" onClick={handleShow} /> :
            <BsJustify className="open" onClick={handleShow} />}
        </div>

        <ul className={show ? 'nav2' : 'menu-disable'} >
          
        <div className="voltar" >  <Link to="/">inicio</Link></div>
          <div className="logout">
            <AiOutlineUser className="logout-icon" /><span className="logout-user">Ola,{nome}  </span>
            <button className="logout-button" type="submit" onClick={logout} > sair </button>

          </div>
        </ul >
      </div>


      {pedidos && (
        <div className="pedidos">
          <h1>Pedidos</h1>
          <div className="wrap-pedidos">
           
            {pedidos.map((pedidos, index) => (
              <section className="pedido" key={pedidos.id_pedido}>
                <img className='imagens' src= {URL+pedidos.imagem}/>
                <h5>Nº:{pedidos.id_pedido}</h5>
                <h5>Item:{pedidos.descricao}</h5>
                <h5>Valor produto:{pedidos.preco}</h5>
              </section>
            ))}
          
          </div>

        </div>)}



      <footer>
        <ToastContainer />
      </footer>
    </div>

  ) 
};

export default Unicocliente;