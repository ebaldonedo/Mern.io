import React, {useState, useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

export default function NuevoProyecto() {

    //Obtener el State del Formulario
    const proyectosContext= useContext(proyectoContext);
    const {formulario, mostrarFormulario, errorformulario,agregarProyecto, mostrarError}= proyectosContext;

    //State Proyecto
    const [proyecto, setproyecto] = useState({
        nombre:''
    });

    const {nombre}= proyecto

    const onChangeProyecto = e=>{
        setproyecto({
            ...proyecto,
            [e.target.name]:e.target.value
        })
    }

    const onSumbitProyecto = e=>{
        e.preventDefault();

        //Validar Pryecto
        if (nombre==='') {
            mostrarError()
            return;
        }
        //Agregar al State
        agregarProyecto(proyecto)
        console.log(proyecto);
        //Reiniciar Form

        setproyecto({
            nombre:''
        })
    }

  return (
    <div>
         <button
            type='button'
            className='btn btn-block btn-primario'
            onClick={()=>{mostrarFormulario()}}
    
    
    
    
        > Nuevo Proyecto</button>
        
        {
            (formulario)?
             (<form 
                className='formulario-nuevo-proyecto'
                onSubmit={onSumbitProyecto}
                >
                    <input
                     
                     type="text" 
                     className='input-text'
                     placeholder='Nombre Proyecto'
                     name='nombre'
                     
                     onChange={onChangeProyecto}
                     value={nombre}
                     
                     />
        
                     <input type="submit" 
                     className='btn btn-primario btn-block'
                     value="Agregar Proyecto"
                     />
        
                </form>

                )
                :null


        }

        {errorformulario ? <p className='mensaje error'>El Nombre del Proyecto es Obligatorio</p>  : null}


    </div>
   
  )
}
