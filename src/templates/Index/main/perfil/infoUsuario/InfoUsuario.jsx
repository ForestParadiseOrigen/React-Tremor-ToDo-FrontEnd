import { useState, useEffect } from "react";
import CambiarNombre from "./cambiarNombre/cambiarNombre";
import CambiarEmail from "./cambiarEmail/CambiarEmail";
import CambiarContrasena from "./cambiarContrasena/CambiarContrasena";

function InfoUsuario() {
    const API_URL = "http://localhost:5000/";

    const [dataTag, setDataTag] = useState([]);
    const [usuarioFiltradoById, setUsuarioFiltradoById] = useState([]);

    useEffect(() => {
        const refreshPendientes = async () => {
            try {
                const info = await fetch(API_URL + "server/todoparadise/usuarios")
                    .then(response => response.json())
                    .then(
                        info => {
                            if (info.data) {
                                setDataTag(info.data);
                                const initialState = {};
                                info.data.forEach((item) => {
                                    initialState[item._id] = item.estado;
                                });
                                setEstadoFront(initialState);
                            } else {
                                console.error('La respuesta de la API no es un array:', info.data);
                            }
                        }
                    );
            } catch (err) {
                console.log(err);
            }
        }

        refreshPendientes();
    }, [])

    useEffect(() => {
        const usuarioRecuperado = localStorage.getItem('usuario');
        const usuarioObjeto = JSON.parse(usuarioRecuperado);
        if (usuarioObjeto !== null) {  // Verifica si usuarioObjeto no es null o undefined
            const usuarioFiltrado = dataTag.filter(info => info._id === usuarioObjeto[0]);
            setUsuarioFiltradoById(usuarioFiltrado);
        }
    }, [dataTag])

    const [setEstadoFront] = useState({});

    return (
        <section className="gap-5 p-5">
            {usuarioFiltradoById.map((index) => (
                <div key={index}>
                    <CambiarNombre />
                    <CambiarEmail />
                    <CambiarContrasena />
                </div>
            ))}
        </section>
    )
}

export default InfoUsuario;
