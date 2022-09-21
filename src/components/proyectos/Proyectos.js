import React,{useContext, useEffect} from 'react';
import Barra from '../layout/Barra';
import Sidebar from '../layout/Sidebar';
import FormTarea from '../tareas/FormTarea';
import ListaTareas from '../tareas/ListaTareas';
import AuthContext from '../../context/autenticacion/authContext';



const Proyectos = () => {

    //extraer informacion de auth
    const authContext = useContext(AuthContext)
    const {usuarioAutenticado}= authContext;

    useEffect(() => {
      usuarioAutenticado();
    
      
    }, [])
    

    return (
        
            <div className='contenedor-app'>
                <Sidebar/>

                <div className='seccion-principal'>
                   <Barra/>
                   
                    <main>
                        <FormTarea/>
                        <div className='contenedor-tareas'>
                            <ListaTareas/>
                        </div>
                    </main>
                </div>
            </div>
        
    );
}

export default Proyectos;
