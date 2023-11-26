
import api from "../../Api"
import "./home.css"
import reactimg from "../../imagens/react.png";
import { BsJustify, BsXLg } from "react-icons/bs";
import { GrFormTrash} from "react-icons/gr";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {

    const [produtos, setProdutos] = useState([])
    const [carrinho, setCarrinho] = useState([])
    const navigate = useNavigate()
    const [cart, setCount] = useState('0')
    const [showcart, setShowcart] = useState(false)
    const [logado, setLogado] = useState(false)
    const [total, setTotal] = useState ()
    const [input, setInput] = useState('');
    const data = { carrinho }

    //url de imagens
    const URL = `http://127.0.0.1:5000/files/`



    //listar produtos
    useEffect(() => {
        api.get("/produtos").then(res => {
            setProdutos(res.data)

        })
    }, []);


    // adicionar produto ao carrinho

    async function handleCarrinho(id_produto) {
        try {
            await api.get(`/produtos/${id_produto}`, {

            }).then(res => { carrinho.push(...res.data[0])})

            setCount(carrinho.length)
     
       

        } catch (error) {
            alert('Não encontrado')

            return
        }
    }


const subTotal = carrinho.reduce((acc,cur)=>  acc += Number(cur.preco),0) 

    // total pedido


    useEffect(() => {
       
      if (localStorage.getItem('token')){
        setLogado(true)

      }
    
      
    
    }, []);

    useEffect(() => {
       
        if(sessionStorage.getItem('car')){
            const res = (sessionStorage.getItem('car')) 
            setCarrinho(JSON.parse(res))
           
            
        }
      
      }, []);

     //quantidade de itens no carrinho caso esteja no session storage
     useEffect(() => {
       
        setCount(carrinho.length)
      
      }, [cart]);

    //buy itens
    function addcrt() {
        sessionStorage.setItem('car', JSON.stringify(carrinho))
        if (!localStorage.getItem("token")){
           { navigate ('/login')}
          }else{
            { navigate ('/cart')}
          }
    }

  // removendo item da lista
  async function handleDelete(index) {
      let Temp =[...carrinho]
      Temp.splice(index,1) 
      setCarrinho(Temp)
      setCount()
  }



    return (
        <div className='container'>
            <div>
                <ul className='nav'>
                    <div className='wrap-icon-user'>
                        <Link className='login' to="/login">meus pedidos</Link><i ><AiOutlineUser className='icone' />  </i>

                        <button className='cart'>
                            <AiOutlineShoppingCart onClick={ () => setShowcart( !showcart)} className='icone-carrinho' />
                            <span className='count'>{cart}</span>
                        </button>


                    </div>

                </ul>
                <div className='wrap-cart-content'>
                    {showcart && (
                        <div className= {carrinho.length?'wrap-cart':'wrap-cart-off'} >
                            {carrinho.map((carrinho, index) => (
                                <section key={carrinho.id_produto} className="itens-cart">
                                    <div className='wrap-item'>
                                        <div className='wrap-image'>
                                            <img className='imagens' src={URL + carrinho.imagem} />
                                            
                                        </div>
                                        <p>{carrinho.descricao}</p>
                                        <p> Valor: {carrinho.preco},00 R$</p>
                                        <div className="trash">
                                        <i className="lixeira" onClick={() => handleDelete(index)}><GrFormTrash /></i>
                                        </div>
                                    </div>
                                    
                                </section>
                            ))}
                            <div className="wrap-total">
                                
                                <h5>Total:{subTotal},00 R$ </h5>
                               
                              {<Link onClick={addcrt} to="/cart" className="add"  >Finalizar Compra</Link>}
                            </div>
                        </div>
                    )}
                </div>

            </div>

            <div className='wrap-filtros'>
                <ul className='wrap-nav-filtros'>
                
                <label>
      <input 
      type="text"
      placeholder="Pesquisar produto..."
      onChange ={(e)=>setInput(e.target.value)}
       /> 
     
      </label>
                </ul>
            </div>
           
                <div className="itens">
                    {produtos.filter((produtoinfo)=>
produtoinfo.descricao.toLowerCase().includes(input.toLowerCase()))
.map((produtoinfo)=>(
                        <section key={produtoinfo.id_produto}>
                            <div className='wrap-item'>
                                <div className='wrap-image'>
                                    <img className='imagens' src={URL + produtoinfo.imagem} />

                                </div>
                                <h5>{produtoinfo.descricao}</h5>
                                <h6> valor:{produtoinfo.preco},00 R$</h6>

                            </div>
                            <a className='add' onClick={() => handleCarrinho(produtoinfo.id_produto)} >Comprar <i className="icones" > <AiOutlineShoppingCart /></i></a>


                        </section>
                    ))}
                </div>
           



        </div>
    )
};

export default Home;