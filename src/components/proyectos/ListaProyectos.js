import React, { useContext, useEffect } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import Proyecto from './Proyecto'
import {CSSTransition,TransitionGroup}from 'react-transition-group'
import AlertaContext from '../../context/alertas/alertaContext'



export default function ListaProyectos() {

  //importar State y context
  const proyectosContext = useContext(proyectoContext)
  const {mensaje,proyectos, obtenerProyectos}= proyectosContext

  const nodeRef= React.useRef(null)

  

  const alertaContext= useContext(AlertaContext);
    const { alerta,mostrarAlerta}= alertaContext; 
  
//Obtener proyectos al cargar el componente
  useEffect(()=>{
    obtenerProyectos();

    
    //en caso de error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria)
    }
    //eslint-disable-next-line
  },[mensaje]);


//Revisar si el State tiene Contenido
    if (proyectos.length===0) {
      return null
    }
  return (
    <ul className='listado-proyecto'>
      {alerta?<div className={`alerta ${alerta.categoria}`}> {alerta.msg}</div> :null}
      <TransitionGroup>
        {
        proyectos.map((proyecto,i)=>(
          <CSSTransition 
          key={proyecto._id}
          timeout={400}
          classNames="proyecto"
          nodeRef={nodeRef}
          
          >
            <Proyecto
            proyecto={proyecto}
            
          />
          </CSSTransition>

        ))}
      </TransitionGroup>
      
    </ul>
  )
}
