import Contador from "./card/Contador";
import { useEffect, useState } from "react";
import Dona from "./chart/Dona";

function Contadores () {

    const API_URL="http://localhost:5000/";
    const [dataTag, setDataTag] = useState([]);
  
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
  
    const tareasRegistradas = dataTag.filter(info => {
      return info.data  !== null;
    }); 
  
    const tareasCompletadas = dataTag.filter(info => {
      return info.estado === true;
    });
  
    const tareasPendientes = dataTag.filter(info => {
      return info.estado === false;
    });
  
    const contadorRegistradas = tareasRegistradas.length;
    const contadorCompletadas = tareasCompletadas.length;
    const contadorPendientes = tareasPendientes.length;
  
    return(
        <div className="grid grid-cols-2 gap-4 my-3 px-4">
            <div className="grid grid-rows-1">
                <Dona contadorPendientes={contadorPendientes} contadorCompletadas={contadorCompletadas}/>
            </div>
            <div className="grid grid-rows-3 gap-4">
                <Contador titulo={"Tareas registradas actualmente"} cifra={contadorRegistradas} />
                <Contador titulo={"Tareas completadas"} cifra={contadorCompletadas} />
                <Contador titulo={"Tareas pendientes"} cifra={contadorPendientes} />
            </div>
        </div>
    )
}

export default Contadores;