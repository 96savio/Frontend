import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Clientes from './pages/Clientes/clientes';
import Home from './pages/Home/Home';
import Newclient from './pages/Newclient/Newcliente';
import Updatecliente from './pages/Updatecliente/Updatecliente';
import FormularioLogin from '../src/pages/FormularioLogin';
import FormularioCadastro from "../src/pages/FormularioCadastro"
import Unicocliente from './pages/Unicocliente/Unicocliente';
import Cart from './pages/Cart/Cart';
import Newproduct from './pages/Newproduct/Newproduct';
import Auth,{} from './pages/Protect/Auth.js'
import Authadm,{} from './pages/Protect/Authadm.js'
function RoutesApp(){
    return(
       <BrowserRouter>
         <Routes>
                   <Route path="/" element={ <Home/> }/>
                <Route path="/login" element={ <FormularioLogin/> }/>
                <Route path="/formulariocadastro" element={ <FormularioCadastro/> }/>
             
                <Route path="/cliente" element={<Auth> <Clientes/></Auth> }/>
                
                <Route path="/adicionarcliente" element={ <Authadm><Newclient/> </Authadm> }/>
                <Route path="/adicionarproduto" element={<Auth> <Newproduct/></Auth> }/>
                <Route path="/editarcliente/:cod_cliente" element={<Auth><Updatecliente/></Auth> }/>
                
                <Route path="/unicocliente/:id" element={<Auth><Unicocliente/></Auth>  }/>
                <Route path="/cart" element={ <Cart/> }/>
              
         </Routes>
       </BrowserRouter> 

    )
}

export default RoutesApp;