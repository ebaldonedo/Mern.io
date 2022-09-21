import React from 'react'
import ListaProyectos from '../proyectos/ListaProyectos'
import NuevoProyecto from '../proyectos/NuevoProyecto'

export default function Sidebar() {
  return (
    <aside>
        <h1>MERN <span>Task</span></h1>
        <NuevoProyecto/>

        <div className="proyectos">
            <h2>Tus Proyectos</h2>

            <ListaProyectos/>
            
        </div>
    </aside>
  )
}
