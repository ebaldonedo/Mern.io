import clienteAxios from "./axios";

const tokenAuth =  token=>{
    console.log("hola de tokenAuth");
    
    if (token) {
        clienteAxios.defaults.headers.common["x-auth-token"]= token
        console.log("se actualizo el header");
    }else{
        //delete clienteAxios.defaults.headers.common["x-auth-token"];
        console.log("Se borro el token");
    }
}

export default tokenAuth;