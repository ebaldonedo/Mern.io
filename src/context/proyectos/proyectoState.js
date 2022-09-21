import React, { useReducer } from 'react'
import proyectosReducer from './proyectosReducer'
import proyectoContext from './proyectoContext'

import { 
    FORMULARIO_PROYECTO,
    OBTERNER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
 } from '../../types'
import clienteAxios from '../../config/axios';




const ProyectoState = props =>{

  

    const initialState= {
        proyectos : [
            
          ],
        formulario:false,
        errorformulario: false,
        proyecto:null,
        mensaje:null
    }
    

    //Dispatch para ejecutar acciones
    const [state, dispatch]=useReducer(proyectosReducer, initialState)


   
    

    //1.-Funciones Crud
    const mostrarFormulario= ()=>{
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //2.-Obtener los proyectos
    const obtenerProyectos =async () =>{
       try {
        const resultado = await clienteAxios.get("/api/proyectos")
        //console.log(resultado.data);

        dispatch({
            type:OBTERNER_PROYECTOS,
            payload:resultado.data.proyectos
           })
       } catch (error) {
        console.log(error);
       }
    }

    //3.-Agregar nuevo proyecto
    const agregarProyecto = async proyecto=>{
        try {
            const resultado = await clienteAxios.post("/api/proyectos", proyecto)
            
            //insertar proyecto en el state
            dispatch({
                type:AGREGAR_PROYECTO,
                payload:resultado.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    //4.-Validar el formulario por errores
    const mostrarError = ()=>{
        dispatch({
            type: VALIDAR_FORMULARIO,
            
        })
    }

    //5.-Selecciona el Proyecto que el usuario dio click

    const proyectoActual = proyectoId =>{
        dispatch({
            type: PROYECTO_ACTUAL,
            payload:proyectoId
        })
    }

    //6.-Eliminar  Proyecto

    const eliminarProyecto = async proyectoId =>{
       try {
        console.log("eliminar-proyecto:"+proyectoId);
        await clienteAxios.delete(`/api/proyectos/${proyectoId}`);

        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
       } catch (error) {

        const alerta={
            msg:"Hubo un error",
            categoria:"alerta-error"
        }
        console.log(error);

        dispatch({
            type:PROYECTO_ERROR,
            payload:alerta
        })
       }
    }

    return(
        <proyectoContext.Provider
        value={{
            proyectos:state.proyectos,
            formulario: state.formulario,
            errorformulario: state.errorformulario,
            proyecto:state.proyecto,
            mensaje:state.mensaje,
            mostrarFormulario,
            obtenerProyectos,
            agregarProyecto,
            mostrarError,
            proyectoActual,
            eliminarProyecto
        
        
        }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;
