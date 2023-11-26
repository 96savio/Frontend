import api from "../../Api"
import { useState } from "react";
import './newproduct.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Newproduct() {
  const [error, setError] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [imagem, setImagem] = useState('')

  var data = {
    descricao,
    preco
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const dados = new FormData()
    dados.append('imagem', imagem)
    dados.append('descricao', data.descricao)
    dados.append('preco', data.preco)
    try {
      await api.post("/newproduct", dados)
      if (Response.post = true) { toast.success("cadastro realizado com sucesso!") }
      else if (Response.post = false) { toast.error("Preencha todos os campos") }

    } catch (e) {
      setError(error.message);
      { alert("erro ao cadastrar!") }

    }


  };




  return (
    <div className="wrap-form">
      <h5>Createproduct</h5>
      <form className="wrap-form-content" onSubmit={handleSubmit}>



        <label>
          Descricao
          <input type="text" placeholder="Descrição" onChange={(e) => { setDescricao(e.target.value) }} />
        </label>

        <label>
          preco
          <input type="text" placeholder="Preço" onChange={(e) => { setPreco(e.target.value) }} />
        </label>


        <label>
          imagem
          <input type="file" name="imagem" onChange={e => setImagem(e.target.files[0])} />

        </label>
        <button className="button-creatproduct" type="submit" onSubmit={handleSubmit} >Cadastrar</button>

      </form>
      <Link to="/cliente">Voltar</Link>
      <ToastContainer limit={1}/> 
    </div>
  )
};

export default Newproduct;