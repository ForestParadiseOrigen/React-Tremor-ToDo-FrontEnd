import React from "react";
import Header from "./header/Header";
import TareasViewer from "./tareas/TareasViewer";
import PerfilViewer from "./perfil/PerfilViewer";

// Tremor Components
"use client";

function Main () {
    return(
        <main className=" sm:ml-64">
            <Header />
            <TareasViewer />
            <PerfilViewer />
        </main>
    )
}

export default Main;