import React, {useState,useContext,useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = () => {

    let navigate=useNavigate()
    

    //extraer valores del cotext auth
    const authContext= useContext(AuthContext);
    const {mensaje,autenticado,iniciarSesion}= authContext

    //extraer los valores del context alerta
    const alertaContext= useContext(AlertaContext);
    const { alerta,mostrarAlerta}= alertaContext;    
    //State
    const [usuario, setUsuario] = useState({
        email:'',
        password:''
    });
    //Extraer
    const {email,password}= usuario

     //En caso de que el usuario de haya autenticado, registrado o se un registro duplicado
     useEffect(() => {
        
        if (autenticado) {navigate("/proyectos/")}

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        // eslint-disable-next-line
    }, [mensaje,autenticado]);



    const onChange =(e)=>{
        setUsuario({
            ...usuario,
            [e.target.name]:e.target.value
        })
    }

    
//Cuando el usuario quiere iniciar sesion
    const onSubmit = e=>{
        e.preventDefault();

        //Validar
        if (email.trim()===""|| password.trim()==="") {
            mostrarAlerta("Todos los campos son obligatorios", "alerta-error")
        }
        //Pasarlo al action
        iniciarSesion({email,password})
    }







    return (
        <div className='form-usuario'>
             {alerta ?(<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) :null}
            <div className='contenedor-form sombra-dark'>
                <h1>Iniciar Sesion</h1>
                <form onSubmit={onSubmit}>
                    <div className='campo-form'>
                        <label htmlFor="email">Email</label>
                        <input 
                        type="email"
                        id='email'
                        name='email'
                        placeholder='Tu Email'
                        onChange={onChange}
                        value={email}
                         />
                    </div>
                    <div className='campo-form'>
                        <label htmlFor="password">Password</label>
                        <input 
                        type="password"
                        id='password'
                        name='password'
                        placeholder='Tu password'
                        value={password}
                        onChange={onChange}
                         />
                    </div>  
                <div className='campo-form'>
                <input type="submit" className='btn btn-primario btn-block' 
                value="Iniciar Sesion"
                />    
                    
                    </div>                      
                </form>

                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>
            </div>
            
        </div>
    );
}

export default Login;
