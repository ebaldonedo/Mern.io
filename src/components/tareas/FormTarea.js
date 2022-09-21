import React, {useContext, useState,useEffect} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';


export default function FormTarea() {

    //Extraer si un proyecto esta activo
    const proyectosContext= useContext(proyectoContext);
    const {proyecto}= proyectosContext;

    //Context Tareas
    const tareasContext = useContext(TareaContext);
    const {tareaseleccionada,agregarTarea, validarTarea, errortarea,
         obtenerTareas, actualizarTarea,limpiarTarea }= tareasContext

    //Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if (tareaseleccionada!== null) {
            guardarTarea(tareaseleccionada)
        }else{
            guardarTarea({
                nombre:''
            })
        }
        
    }, [tareaseleccionada]);

    //State del formulario
    const [tarea,guardarTarea]= useState({
        nombre:''
    })

    //extraer el nombre del proyecto
    const {nombre}=tarea

    //Si no hay proyecto
    if (!proyecto) return null;
    
    //Array Destructuring
    const [proyectoActual] = proyecto  
    
    //Leer los valores
    const handleChange = e =>{
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value

        })
    }




    const onSumbit= e =>{
        e.preventDefault();

        //Validar
        if (nombre.trim()==='') {
            validarTarea()
            return
        }

        //Editar o agregar tarea
        if (tareaseleccionada===null) {
            //Agregar la nueva tarea al state de tareas
            tarea.proyecto= proyectoActual._id;
            agregarTarea(tarea)  
            
        }else{
            //act tarea
            actualizarTarea(tarea)

              // Elimina tareaseleccionada del state
              limpiarTarea();
        }
       

        

        //Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual._id)
        //Reniciar el form
        guardarTarea({
            nombre:''
        })
    }

  return (
    <div className='formulario'>
        <form
        onSubmit={onSumbit}
        >

            <div className="contenedor-input">
                <input 
                    type="text"
                    className='input-text'
                    placeholder='Nombre Tarea...'
                    name="nombre"
                    value={nombre}
                    onChange={handleChange}


                
                />
            </div>
            <div className="contenedor-input">
                <input 
                    type="submit"
                    className='btn btn-primario btn-block btn-submit'
                    value={tareaseleccionada ? 'Editar Tarea': "Agregar Tarea"}

                
                />
            </div>            
        </form>
        {errortarea ? <p className='mensaje error'>El nombre de la tarea es obligatorio</p>:null}
    </div>
  )
}
