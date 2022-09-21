import React, {useReducer} from 'react'
import TareaContext from './tareaContext'
import TareaReducer from './tareaReducer'
import {v4 as uuid} from "uuid"; 

import { ACTUALIZAR_TAREA, AGREGAR_TAREA, ELIMINAR_TAREA, ESTADO_TAREA, TAREAS_PROYECTO, TAREA_ACTUAL, VALIDAR_TAREA } from '../../types'


const TareaState = props =>{
    const initialState={
        tareas:[
         
        ],
        tareasproyecto:null,
        errortarea:false,
        tareaseleccionada:null

    }

    //Crear dispatch y state
    const [state,dispatch]= useReducer(TareaReducer, initialState)

    //Crear las funciones

    //1.-Obtener las tareas de un proyecto
    const obtenerTareas= proyectoId =>{
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        })
    }

    //2.-Agregar una tarea al proyecto seleccionado

    const agregarTarea = tarea =>{
        tarea.id=uuid();
        dispatch({
            type:AGREGAR_TAREA,
            payload: tarea
        })
    }
    //3.-Validar Tarea
    const validarTarea =() =>{
        dispatch({
            type:VALIDAR_TAREA
        })
    }

    //4.-Eliminar tareas por id
    const eliminarTarea = id =>{
        dispatch({
            type: ELIMINAR_TAREA,
            payload:id
        })
    }

    //5.-Cambiar el estado de la tarea
    const cambiarEstadoTarea = tarea =>{
        dispatch({
            type: ESTADO_TAREA,
            payload:tarea
        })

    }

    //6.- Extrae una tarea para la edicion
    const guardarTareaActual = tarea =>{
        dispatch({
            type: TAREA_ACTUAL,
            payload:tarea
        })
    }

    //7.-Edita o modifica una tarea
    const actualizarTarea = tarea =>{
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload:tarea
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
            cambiarEstadoTarea,
            guardarTareaActual,
            actualizarTarea
        }}
        
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;


