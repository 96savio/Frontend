import api from "../../Api"
import { useState, useEffect } from "react";
import './updatecliente.css';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initialState = {
  nome_cliente: " ",
  sobrenome_cliente: " ",
}



function Updatecliente() {

  const [state, setState] = useState(initialState)
  const { nome_cliente, sobrenome_cliente } = state
  const [error, setError] = useState('')


  const { cod_cliente } = useParams()


  useEffect(() => {
    api.get(`/edit/${cod_cliente}`)
      .then((res) => setState({ ...res.data[0] }))

  }, [cod_cliente]);
//ok
const [nome, setNomenv] = useState (state.nome)
const [cpf, setCpf] = useState (state.cpf)

//teste


  //editar
  const handleEdit = async (e) => {
    e.preventDefault(e);
    setError('');
    try {
      await api.put(`/updatecliente/${cod_cliente}`, {
       nome: nome,
       cpf: cpf
      

      })
      

        
      if (Response.post = true) { toast.success("update realizado com sucesso!") }

    }
    catch (e) {
      setError(error.message);
      { toast.warn("erro ao atualizar!") }

    }


  };
  return (

    <div className="formcontrol">

      <h1>Editar</h1>
      <form className="formcadastro" onSubmit={handleEdit}>

        <label>
          Nome
          <input
          value={state.nome }
          onChange={e =>setNomenv(e.target.value) || setState (e.target.value) }
        
          />
        </label>

        <label>
          Cpf
          <input
           value={state.cpf}
            onChange={e => setCpf(e.target.value) || setState (e.target.value) }
           
            
          />
        </label>
        <button className="button"type="submit">Atualizar</button>

      </form>
     <Link className="voltar" to="/cliente">Voltar</Link>
     <ToastContainer limit={1}/> 
    </div>
  )
};

export default Updatecliente;