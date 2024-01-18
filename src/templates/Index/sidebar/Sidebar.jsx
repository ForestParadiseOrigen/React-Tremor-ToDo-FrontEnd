import { useNavigate } from "react-router-dom";

function Sidebar () {
    const navigate = useNavigate()
    
    function cerrarSesion(){
        sessionStorage.clear()

        console.log("Sesion cerrada")
        navigate("/ingreso");
        console.log(sessionStorage)
    }
    
    return(
        <aside id="separator-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-5 overflow-y-auto bg-white dark:bg-gray-800 border-e-2">
                <a href="https://flowbite.com" className="my-3 py-2 px-5 rounded-lg flex items-center justify-center text-violet-900 border-2 border-dashed border-violet-900 dark:border-gray-700">
                    <span className="flex-1 self-center text-2xl font-bold whitespace-nowrap dark:text-white ms-2">To-Do</span>
                </a>
                <ul className="space-y-2 font-medium border-y-2 py-3">
                    <li>
                        <a href="#TareasViewer" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            <span className="flex-1 ms-3 whitespace-nowrap">Tareas</span>
                        </a>
                    </li>
                    <li>
                        <a href="#PerfilViewer" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>

                            <span className="flex-1 ms-3 whitespace-nowrap">Perfil</span>
                        </a>
                    </li>
                </ul>
                <ul className="my-3 space-y-2 font-medium border-gray-200 dark:border-gray-700">
                    <li>
                        <a href="#" onClick={cerrarSesion} className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                            </svg>
                            <span className=" flex-1 ms-3">Cerrar Sesion</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar;