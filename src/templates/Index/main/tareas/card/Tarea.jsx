import { TextInput } from "@tremor/react";
import { Button, Divider } from "@tremor/react";
import { XIcon } from "@heroicons/react/outline";
import { Icon } from "@tremor/react";
import { useEffect, useState } from "react";

function Tarea ({ info }) {

    const API_URL = "http://localhost:5000/";

    const [dataTag, setDataTag] = useState([]);

    useEffect(() => {
        // En esta función estoy consultando una ruta específica que me trae toda la data de pendientes registrados.
        const refreshPendientes = async () => {
            try {
                // Info es la variable en la que estamos almacenando la data que está llegando del servidor "remoto"
                const info = await fetch(API_URL + "server/todoparadise/pendientes")
                .then((response) => response.json())
                .then((info) => {
                    // En "info.data" es donde se almacenan todos los pendientes en formato JSON.
                    if (info.data) {
                    setDataTag(info.data);
                    const initialState = {};
                    // Aquí estamos atentos por medio del forEach del estado del pendiente según su ID.
                    info.data.forEach((item) => {
                        initialState[item._id] = item.estado;
                    });
                    setEstadoFront(initialState);
                    } else {
                    console.error("La respuesta de la API no es un array:", info.data);
                    }
                });
            } catch (err) {
                console.log(err);
            }
        };
        refreshPendientes();
    }, []);

    const [estadoFront, setEstadoFront] = useState({});

    const cambioEstado = async () => {
        try {
        const nuevoEstado = !estadoFront[info._id]; // Corrección aquí
        const paquete = { estado: nuevoEstado };

        await fetch(API_URL + `server/todoparadise/pendientes/${info._id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(paquete),
        });

        setEstadoFront((prev) => ({ ...prev, [info._id]: nuevoEstado })); // Corrección aquí

        refreshPendientes();
        
        } catch (err) {
        console.log("Error en la solicitud fetch:", err);
        }
        
    };
  
    const eliminarPendiente = async (id) => {
        try {
        await fetch(API_URL + `server/todoparadise/pendientes/${id}`, {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((result) => {
            console.log(result);
            // No recargues la página aquí, ya que ya estás usando refreshPendientes() que realiza la actualización necesaria.
            refreshPendientes(); // Usa la función para actualizar la lista después de eliminar.
            });
        } catch (err) {
        console.log("Error en la solicitud fetch:", err);
        }

        location.reload();
    };

    return(
        <div className="flex items-center justify-center rounded bg-violet-50 p-2 dark:bg-gray-800 group shadow-sm">
            <div className="text-cente border-e border-violet-200 pe-2 me-2">
                <Button
                    size="xs"
                    onClick={cambioEstado}
                    className={
                        estadoFront[info._id] 
                        ? "me-1  bg-gray-300 hover:bg-gray-200 hover:border-gray-300 shadow-gray-400 border-gray-300 text-gray-500"
                        : "me-1  bg-violet-800 hover:bg-violet-600 hover:border-violet-600 shadow-violet-600 border-violet-800 text-white"
                    }
                >    
                    {estadoFront[info._id] ? "No completar" : "Completar"}
                </Button>
            </div>
            <TextInput
                value={info.titulo}
                className={
                    estadoFront[info._id]
                    ? "border-violet-200 bg-gray-300 line-through"
                    : "border-violet-200 bg-white-400"
                }
                readOnly/>
            <div className="text-cente border-s border-violet-200 ps-2 ms-2">
                <Button
                    size="xs" 
                    className={
                        estadoFront[info._id] 
                        ? "me-1  bg-gray-300 hover:bg-gray-200 hover:border-gray-300 shadow-gray-400 border-gray-300 text-gray-500"
                        : "me-1  bg-violet-800 hover:bg-violet-600 hover:border-violet-600 shadow-violet-600 border-violet-800 text-white"
                    }
                >
                    <Icon
                        icon={XIcon}
                        color={
                            estadoFront[info._id] 
                            ? "me-1  bg-gray-300 hover:bg-gray-200 hover:border-gray-300 shadow-gray-400 border-gray-300 text-gray-500"
                            : "me-1  bg-violet-800 hover:bg-violet-600 hover:border-violet-600 shadow-violet-600 border-violet-800 text-white"
                        }
                        size="xs" 
                        onClick={() => eliminarPendiente(info._id)}/>
                </Button>
            </div>
        </div> 
    )
}

export default Tarea;