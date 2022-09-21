import { CERRAR_SESION, LOGIN_ERROR, LOGIN_EXITOSO, MOSTRAR_ALERTA, OBTENER_USUARIO, OCULTAR_ALERTA, REGISTRO_ERROR, REGISTRO_EXITOSO } from "../../types";



export default (state,action)=>{
    switch(action.type){
        case LOGIN_EXITOSO:
        case REGISTRO_EXITOSO:
            localStorage.setItem("token",action.payload.token)
            console.log(action.payload.token);
            
            
            return {
                ...state,
                autenticado:true,
                mensaje:null
            }
        case OBTENER_USUARIO:
            return{
            ...state,
            autenticado:true,
            usuario:action.payload
        }
        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            //localStorage.removeItem("token")
            return{
                ...state,
                token:null,
                usuario:null,
                autenticado:false,
                mensaje:action.payload
            }

        default:
            return state;

    
}

}