import React, {useState,useContext,useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {
    let navigate=useNavigate()
    

    //extraer valores del cotext auth
    const authContext= useContext(AuthContext);
    const {registrarUsuario,mensaje,autenticado}= authContext

    //extraer los valores del context alerta
    const alertaContext= useContext(AlertaContext);
    const { alerta,mostrarAlerta}= alertaContext;

    //En caso de que el usuario de haya autenticado, registrado o se un registro duplicado
    useEffect(() => {
        
        if (autenticado) {
           
           navigate("/proyectos/")
        }

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        
    }, [mensaje,autenticado]);

    //State para iniciar sesion
    const [usuario, setUsuario] = useState({
        nombre:'',
        email:'',
        password:'',
        confirmar:''
    });

    //Extraer de usuario
    const {nombre,email,password,confirmar}= usuario

    const onChange =(e)=>{
        console.log(nombre);
        setUsuario({
            ...usuario,
            [e.target.name]:e.target.value
        })

    }
    const onSubmit = (e)=>{
        
        e.preventDefault();

        //Validar
        if (nombre.trim()===''|| 
            email.trim()===''||
            password.trim()===''|| 
            confirmar.trim()===''
        ) {
            mostrarAlerta("todos los campos son obligatorios","alerta-error")
            return;
        }
        
        // Password minimo de 6 caracteres
        if(password.length < 6) {
            mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error');
            return;
        }

        // Los 2 passwords son iguales
        if(password !== confirmar) {
            mostrarAlerta('Los passwords no son iguales', 'alerta-error');
            return;
        }

        // Pasarlo al action
             registrarUsuario({
                nombre,
                email,
                password
             })
        
        

        
    }

    return (
        <div className='form-usuario'>
            {alerta ?(<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) :null}
            <div className='contenedor-form sombra-dark'>
                <h1>Obtener una Cuenta</h1>
                <form onSubmit={onSubmit}>
                <div className='campo-form'>
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                        type="text"
                        id='nombre'
                        name='nombre'
                        placeholder='Tu nombre'
                        onChange={onChange}
                        value={nombre}
                         />
                    </div>

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
                        onChange={onChange}
                        value={password}
                         />
                    </div>

                    <div className='campo-form'>
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input 
                        type="password"
                        id='confirmar'
                        name='confirmar'
                        placeholder='Repite Tu password'
                        onChange={onChange}
                        value={confirmar}
                         />
                    </div> 




                <div className='campo-form'>
                <input type="submit" className='btn btn-primario btn-block' 
                value="Registrarme"
               
                />    
                    
                    </div>                      
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Volver a inicio de sesion
                </Link>
            </div>
            
        </div>
    );   
}

export default NuevaCuenta;
