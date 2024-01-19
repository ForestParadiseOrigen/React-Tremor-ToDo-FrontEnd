import { useEffect, useState } from 'react';
import { Divider } from "@tremor/react";
import Tarea from "./card/Tarea";
import DinamicBar from "../dinamicBar/DinamicBar";
import Contadores from '../contadores/Contadores';

function TareasViewer () {
    const API_URL="http://localhost:5000/";
    const [dataTag, setDataTag] = useState([])

    // ... (resto del código)

    useEffect(() => {
        const refreshPendientes = async () => {          
            try {  
                const usuarioRecuperado = localStorage.getItem('usuario');
                const usuarioObjeto = JSON.parse(usuarioRecuperado);
                
                if (usuarioObjeto !== null) { 
                    const idUsuarioLocal = usuarioObjeto[0];
    
                    const info = await fetch(API_URL + `server/todoparadise/pendientes/usuario/${idUsuarioLocal}`)
                        .then(response => response.json())
                        .then(info => {
                            if (info.success) {
                                setDataTag(info.data);
                                const initialState = {};
                                info.data.forEach((item) => {
                                    initialState[item._id] = item.estado;
                                });
                                setEstadoFront(initialState);
                            } else {
                                console.error('La respuesta de la API no es un array:', info.message);
                            }
                        });
                }
            } catch (err) {
                console.log(err);
            }
        }
    
        refreshPendientes();
    }, []);

// ... (resto del código)

    
    const handleDelete = (event) => {
        const value = event.target.value;
        eliminarPendiente(value)
    }
 
    const [inputBuscarTarea, setInputBuscarTarea] = useState({})
    const [cartasFiltradas, setCartasFiltradas] = useState([]); // Agregamos el estado

    const inputBuscarTareaHandle = (event) => {
        const value = event.target.value;
        setInputBuscarTarea(value);
    
        const cartasFiltradas = dataTag.filter(info => {
            if (value === "") {
                return info.data;
            } else {
                return info.titulo.toLowerCase().includes(value.toLowerCase());
            }
        });
    
        setCartasFiltradas(cartasFiltradas);
    }
    
    return(
        <div id="TareasViewer" className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 my-5" style={{display : "block"}}>
                {/* CONTADORES */}
                <Contadores />
                
                <DinamicBar inputBuscarTareaHandle={inputBuscarTareaHandle}/>

                <div className="grid grid-cols-2 gap-4 px-5 pt-5 my-5 max-h-72 overflow-auto">
                    {cartasFiltradas.length > 0 ? (
                        cartasFiltradas.map((info, index) => (
                            <Tarea key={index} info={info} handleDelete={handleDelete}/>
                        ))
                    ) : (
                        dataTag.map((info, index) => (
                            <Tarea key={index} info={info} handleDelete={handleDelete}/>
                        ))
                    )}                  
                </div>
            </div>
    )
}

export default TareasViewer;