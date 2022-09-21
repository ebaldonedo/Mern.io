import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';
import tokenAuth from "./config/tokenAuth";
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/autenticacion/authState";

import ProyectoState from "./context/proyectos/proyectoState";
import TareaState from "./context/tareas/tareaState";

//Revisar si tenemos token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token)
}

function App() {
  console.log(process.env.REACT_APP_BACKEND_URL);
  return (
    
    
      <ProyectoState>
        <TareaState>
          <AlertaState>
            <AuthState>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/nueva-cuenta" element={<NuevaCuenta />} />
                <Route path="/proyectos" element={<Proyectos />} />
              </Routes>
            </BrowserRouter>
            </AuthState>
              
          </AlertaState>
          
        </TareaState>      
      </ProyectoState>
      
    
  );
}

export default App;
