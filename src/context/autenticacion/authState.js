import React,{useReducer} from 'react'
import clienteAxios from '../../config/axios'
import { CERRAR_SESION, LOGIN_ERROR, LOGIN_EXITOSO, OBTENER_USUARIO, REGISTRO_ERROR, REGISTRO_EXITOSO } from '../../types'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import tokenAuth from "../../config/tokenAuth";

const AuthState= props =>{
    const initialState = {
        token:localStorage.getItem("token"),
        autenticado:null,
        usuario:null,
        mensaje:null
    }

    const [state, dispatch]= useReducer(AuthReducer,initialState)

    //Funciones
    const registrarUsuario = async datos=>{
        try {
            const respuesta = await clienteAxios.post("/api/usuarios",datos);
            console.log(respuesta.data);
            localStorage.setItem("token",respuesta.data.token)

             dispatch({
                type:REGISTRO_EXITOSO,
                payload:respuesta.data
                
            })
         //obtener el usuario autenticado
           usuarioAutenticado();    
        } catch (error) {
            //console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria:"alerta-error"
            }
            dispatch({type:REGISTRO_ERROR,
            payload:alerta})
        }

       
    }

    //retorna el usuario autenticado
    const usuarioAutenticado = async ()=>{
        
         const token=  localStorage.getItem("token");
        console.log("token de usuario autenticado: "+token);
        if (token) {
            //TODO:Funcion para enviar el token po header
             tokenAuth(token)
        }

        try {
            const respuesta= await clienteAxios.get("/api/auth")
            console.log(respuesta);
         dispatch({
            type:OBTENER_USUARIO,
            payload:respuesta.data.usuario
        })    
        } catch (error) {
            console.log(error.response);
            dispatch({
                type:LOGIN_ERROR
            })
        }
    }
    //  INICIAR SESION
    const iniciarSesion = async datos =>{
        try {
            const respuesta = await clienteAxios.post("api/auth",datos)
            console.log(respuesta);

            dispatch({
                type:LOGIN_EXITOSO,
                payload:respuesta.data
            })

            //obtener el usuario
            usuarioAutenticado();
            
        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria:"alerta-error"
            }
            dispatch({type:LOGIN_ERROR,
            payload:alerta})
        }
        
    }

    //CERRAR SESION DE USUARIO
    const cerrarSesion = ()=>{
       dispatch({
        type:CERRAR_SESION
       }) 
    }

    return(
        <AuthContext.Provider
        value={{
            token:state.token,
            autenticado:state.autenticado,
            usuario:state.usuario,
            mensaje:state.mensaje,
            registrarUsuario,
            iniciarSesion,
            usuarioAutenticado,
            cerrarSesion
        }}
        >
            {props.children}

        </AuthContext.Provider>
    )
}

export default AuthState