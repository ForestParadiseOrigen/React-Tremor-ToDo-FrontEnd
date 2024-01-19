import React from "react";
import Header from "./header/Header";
import TareasViewer from "./tareas/TareasViewer";
import PerfilViewer from "./perfil/PerfilViewer";
import PomodoroViewer from "./pomodoros/PomodoroViewer";

// Tremor Components
"use client";

function Main () {
    return(
        <main className=" sm:ml-64">
            <Header />
            <TareasViewer />
            <PomodoroViewer />
            <PerfilViewer />
        </main>
    )
}

export default Main;