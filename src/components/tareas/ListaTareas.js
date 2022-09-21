import React, {useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import TareaContext from '../../context/tareas/tareaContext'
import Tarea from './Tarea'
import {CSSTransition,TransitionGroup}from 'react-transition-group'




export default function ListaTareas() {


    //importar State y context
    const proyectosContext = useContext(proyectoContext)
    const {proyecto, eliminarProyecto}= proyectosContext;

    //Obtener las tareas del proyecto
    const tareasContext = useContext(TareaContext)
    const {tareasproyecto}= tareasContext;

    //Si no hay proyecto
    if (!proyecto) return <h2>Selecciona un Proyecto</h2>
    
    //Array Destructuring
    const [proyectoActual] = proyecto   




    
    //Eliminar un proyecto
    const onClickEliminar = ()=>{
        eliminarProyecto(proyectoActual._id)
    }

  return (
    <div className='caja2'>
        <h2>Proyecto: {proyectoActual.nombre} </h2>
        <ul className="listadotareas">
            {tareasproyecto.length === 0
                ? (<li className='tarea'><p>No hay tareas</p></li>)
                : 
                <TransitionGroup>
                { tareasproyecto.map((tarea,i)=>(
                       <CSSTransition 
                       key={i}
                       timeout={400}
                       classNames="tarea"
                       >
                         <Tarea
                            tarea={tarea}
                            
                        />
                       </CSSTransition>
                        ))
                }                    
                </TransitionGroup>
               
            
            }
        </ul>

        <button
            type='button'
            className='btn btn-eliminar'
            onClick={onClickEliminar}
        >Eliminar Proyecto &times;</button>
    </div>
  )
}
