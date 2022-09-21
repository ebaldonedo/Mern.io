import React,{useContext,useEffect} from 'react'
import AuthContext from '../../context/autenticacion/authContext';
import {useNavigate} from 'react-router-dom';
export default function Barra() {

 //extraer informacion de auth
 const authContext = useContext(AuthContext)
 const {usuario,cerrarSesion,autenticado}= authContext;
 let navigate=useNavigate()

 useEffect(() => {
   //usuarioAutenticado();
  if (autenticado===false) {
    console.log("cerrar sesion");
    
    navigate("/")
    localStorage.removeItem("token")
}
// eslint-disable-next-line
 }, [autenticado])


 


  return (
    <header className='app-header'>
      {usuario ? <p className='nombre-usuario'>Hola <span>{usuario.nombre}</span></p> :null}
       
        
        <nav className='nav-principal'>
          <button
          className='btn btn-blank cerrar-sesion'
          onClick={()=>cerrarSesion()}
          
          >Cerrar Sesion</button>
           

        </nav>
    </header>
  )
}
