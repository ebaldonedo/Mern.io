import React, {useReducer} from 'react'
import TareaContext from './tareaContext'
import TareaReducer from './tareaReducer'
import clienteAxios from "../../config/axios"


import { ACTUALIZAR_TAREA, AGREGAR_TAREA, ELIMINAR_TAREA,  LIMPIAR_TAREA, TAREAS_PROYECTO, TAREA_ACTUAL, VALIDAR_TAREA } from '../../types'


const TareaState = props =>{
    const initialState={
        
        tareasproyecto:[],
        errortarea:false,
        tareaseleccionada:null

    }

    //Crear dispatch y state
    const [state,dispatch]= useReducer(TareaReducer, initialState)

    //Crear las funciones

    //1.-Obtener las tareas de un proyecto
    const obtenerTareas= async proyecto =>{
        
        try {
            const resultado = await clienteAxios.get(`api/tareas`,{params:{proyecto}})
            console.log(resultado.data.tarea);
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log("Error de obtener tareas");
        }
    }

    //2.-Agregar una tarea al proyecto seleccionado

    const agregarTarea = async tarea =>{
        console.log(tarea);
       try {
        const resultado = await clienteAxios.post("api/tareas",tarea);
        console.log(resultado);
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })        
       } catch (error) {
        console.log(error);
       }
        
    }
    //3.-Validar Tarea
    const validarTarea =() =>{
        dispatch({
            type:VALIDAR_TAREA
        })
    }

    //4.-Eliminar tareas por id
    const eliminarTarea = async (id, proyecto) =>{
        try {
           await clienteAxios.delete(`api/tareas/${id}`,{params:{proyecto}}); 
           dispatch({
            type: ELIMINAR_TAREA,
            payload:id
        })
        } catch (error) {
            console.log(error);
        }
    }

     //7.-Edita o modifica una tarea
     const actualizarTarea = async tarea =>{
        try {
            const resultado= await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
            console.log(resultado.data);

            dispatch({
                type: ACTUALIZAR_TAREA,
                payload:resultado.data.tarea
            })
        } catch (error) {
            console.log(error);
        }
        
    }

    //6.- Extrae una tarea para la edicion
    const guardarTareaActual = tarea =>{
        dispatch({
            type: TAREA_ACTUAL,
            payload:tarea
        })
    }

   

    //8.-LIMPIAR TAREA
     // Elimina la tareaseleccionada
     const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (
        <TareaContext.Provider
        value={{
           
            tareasproyecto: state.tareasproyecto,
            errortarea:state.errortarea,
            tareaseleccionada:state.tareaseleccionada,
            obtenerTareas,
            agregarTarea,
            validarTarea,
            eliminarTarea,
           
            guardarTareaActual,
            actualizarTarea,
            limpiarTarea
        }}
        
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;


