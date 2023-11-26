import React from "react";
import { useState,useEffect} from "react";
import api from "../../Api"
import "./cart.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link, redirect, useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";
const URL = `http://localhost:5000/files/`

function Cart (){
    const navigate = useNavigate()
    const [itens, setItens] = useState([])

   const [error, setError] = useState('')
   const [id_pedido, setIdpedido] = useState({})
   const [id_cliente, setIdcliente] = useState('')
 
// verifica se tem token para poder acessar a pagina

if (!localStorage.getItem("token")) {{ navigate('/login') } }


//verificar se tem id, e demais campos 
   

//get itens to local storage and update state
    useEffect(() => {
      
     const res = (sessionStorage.getItem("car")) 
      setItens(JSON.parse(res))
  
      const idcliente = (sessionStorage.getItem("id")) 
      setIdcliente(JSON.parse(idcliente))
     
      }, []); 

      //get last id pedido
      useEffect((itens) => {
       const res = api.get("/lastpedido").then(res => {
          setIdpedido (res.data +1)
         
        })
      }, [id_pedido]);

//add id_pedido in array itens 
      itens.forEach((itens2)=>(itens2.id_pedido = id_pedido ,itens2.id_cliente=id_cliente)
      
      )

      const subTotal = itens.reduce((acc,cur)=>  acc += Number(cur.preco),0)
// send data
const handleSubmit = async (e) => {
   e.preventDefault();
    setError('');
   
    itens.forEach(data => {
    api.post(`/neworder/`, data).then(data=>{
    
      if (Response.data = true )
      {toast.success(data.data.message)
        setTimeout(() => {
          {navigate ('/')} 
        }, 5000); 
     
      

        
      (sessionStorage.removeItem('car') )
    }else if((!sessionStorage.getItem("car"))){
      navigate ('/')
    }else{toast.warning(data.data.message)}
      })
      
      .catch (error)  
});



  };



return(
    <div className="wrap-all">
    
      {itens && (
            <div className="itens-cart2">
                 {itens.map((itens, index) => (
            <section key={itens.id_produto}>
               <div className='wrap-item' >
              
                <img className='imagens' src= {URL+itens.imagem}/>
                <p>{itens.descricao}</p>
                <p>R${itens.preco},00R$</p>
                </div>
                
            </section>
            
            
           
               ))}
              
            </div>
            
            )}
     
          <div className="Finalizar"> 
     <h5>Total:{subTotal},00R$ </h5>
              <Link onClick={handleSubmit}  >Finalizar Compra</Link>
              
              </div> 
      <ToastContainer limit={1}/> 
    </div>
  
)};

export default Cart;