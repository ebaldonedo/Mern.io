import React,{useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';



export default function Proyecto({proyecto}) {
  const proyectosContext= useContext(proyectoContext);
  const {proyectoActual,}= proyectosContext;


  //obtener funcion del context de tarea
  const tareasContext = useContext(TareaContext);
  const {obtenerTareas}= tareasContext



  //Funcion para agregar el proyecto actual
  const seleccionarProyecto = id=>{
    console.log(proyecto);
    proyectoActual(id)//Fijar proyecto actual
    obtenerTareas(id);//Filtrar las tareas cuando se de click
  }



  return (
   <li>
        <button
          type="button"
          className=" btn btn-blank"  
          onClick={()=> seleccionarProyecto(proyecto._id)}      
        >
          {proyecto.nombre}
        </button>
   </li>
  )
}
