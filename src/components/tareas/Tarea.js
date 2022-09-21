import React, {useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

export default function Tarea({tarea}) {
    //Context Proyecto 
   
    const proyectosContext= useContext(proyectoContext);
    const {proyecto}= proyectosContext;

    //Extraer el proyecto
    const [proyectoActual]= proyecto
    //Context Tareas
    const tareasContext = useContext(TareaContext);
    const {eliminarTarea, obtenerTareas,actualizarTarea,guardarTareaActual }= tareasContext

    //Funcion que se ejecuta cuandl el usuario elimina una tarea
    const tareaEliminar = (id)=>{
        eliminarTarea(id,proyectoActual._id)
        obtenerTareas(proyectoActual._id)
        

    }

    //Funcion para cambiar estado de las tareas
    const cambiarEstado = tarea =>{
        tarea.estado=!tarea.estado
        actualizarTarea(tarea)

    }

    //Funcion para editar una tarea
    const seleccionarTarea =tarea =>{
        guardarTareaActual(tarea);
    }

  return (
    <li className='tarea sombra'>
        <p>
            {tarea.nombre}
        </p>

        <div className="estado">
            {(tarea.estado)
            ?
                (<button 
                    type='button'
                    className='completo'
                    onClick={()=>cambiarEstado(tarea)}
                    >Completo</button>
                )

            :  (<button 
                type='button'
                className='incompleto'
                onClick={()=>cambiarEstado(tarea)}
                >Incompleto</button>
            )
        }

       




        </div>





        <div className="acciones">
            <button
            type='button'
            className='btn btn-primario'
            onClick={()=> seleccionarTarea(tarea)}
            >Editar</button>

            <button
            type='button'
            className='btn btn-secundario'
            onClick={()=>tareaEliminar(tarea._id)}
            >Eliminar</button>                
        </div>
    </li>
  )
}
