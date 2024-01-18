import { useEffect, useState } from "react";

function Header () {
    const usuarioRecuperado = localStorage.getItem('usuario');
    const usuarioObjeto = JSON.parse(usuarioRecuperado);
    const [photoUser] = useState(localStorage.getItem("photoUserLocal") || "");

    return(
        
        <header>
            <nav className="bg-white border-gray-200 lg:px-6">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <a href="https://flowbite.com" className="flex items-center">
                        <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-white">Dashboard</span>
                    </a>
                    <div className="flex items-center lg:order-2">
                        <a href="#" className="flex items-center justify-center flex-row-reverse text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 ">
                            <img 
                                src={usuarioObjeto[4]}
                                className="ms-4 rounded-full shadow-md max-w-10 max-h-10"/>
                            <span className="text-lg">{usuarioObjeto && Array.isArray(usuarioObjeto) ? usuarioObjeto[1] : 'Nombre de Usuario'}</span>
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;