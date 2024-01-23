import { useState, useEffect } from "react";
import { Text, TextInput, Button } from "@tremor/react";
import { redirect, useNavigate } from "react-router-dom";

function CambiarNombre () {
    const navigate = useNavigate()
    const API_URL = "http://localhost:5000/"

    const [dataTag, setDataTag] = useState([]);
    const [usuarioFiltradoById, setUsuarioFiltradoById] = useState([]);

    useEffect(() => {
        const usuarioRecuperado = localStorage.getItem('usuario');
        const usuarioObjeto = JSON.parse(usuarioRecuperado);
        
        if (usuarioObjeto !== null) {
            const usuarioFiltrado = dataTag.filter(info => info._id === usuarioObjeto[0]);
            setUsuarioFiltradoById(usuarioFiltrado);
        }

    }, [dataTag])

    const [errorNombres, setErrorNombres] = useState("");
    const [inputNombres, setInputNombres] = useState("");

    const inputNombresHandle = (event) => {
        const value = event.target.value;
        setInputNombres(value);
        setErrorNombres("");
    }

    const validarNombres = () => {
        if (inputNombres.trim().length === 0) {
            setErrorNombres("Ingrese nombres válidos.");
            return false;
        }
        return true;
    };

    const validacionNombreHandle = (event) => {
        event.preventDefault();
        console.log('handle');
        console.log(validarNombres);

        if (validarNombres()) {
            console.log('La validacion del nombre ha sido exitosa');
            actualizarNombreUsuario();
        }
    };

    const actualizarNombreUsuario = async () => {
        const usuarioRecuperado = localStorage.getItem('usuario');
        const usuarioObjeto = JSON.parse(usuarioRecuperado);
        const usuarioFiltrado = dataTag.filter(info => info._id === usuarioObjeto[0]);
        setUsuarioFiltradoById(usuarioFiltrado);

        try {
            const paquete = { nombres: inputNombres,};
            console.log(paquete)
            await fetch(API_URL + "server/todoparadise/usuarios/" + usuarioObjeto[0], {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(paquete),
            })

            .then((response) => response.json())
            .then((result) => {
                console.log(result);
            });

            alert('Se ha cambiado tu nombre de usuario crrectamente. Debes volver a iniciar sesion.')
        } catch (err) {
            console.log("Error en la solicitud fetch:", err);
        }
        
        localStorage.clear();
        navigate('/ingreso')
        location.reload();
    }

    return(
        <>
            <article className="flex flex-col text-start justify-center mb-5 border-b pb-5">
                <h1 className="text-2xl font-bold">Cambio de nombre</h1>
                <Text className="text-base">Aquí puedes revisar y actualizar tu nombre y correo electrónico cuando quieras.</Text>
            </article>

            <form onSubmit={validacionNombreHandle} className="flex flex-col gap-5 justify-start border-b pb-5" >
                <TextInput
                    error={errorNombres.length > 0}
                    errorMessage={errorNombres}
                    id="nombres"
                    type="text"
                    placeholder="Agregar nombres..."
                    onChange={inputNombresHandle}
                    onBlur={validarNombres}
                />
                <div className="flex">
                    <Button type="submit" className="border-violet-600 bg-violet-800 hover:bg-violet-600 hover:border-violet-600 shadow-violet-600">Actualizar</Button>
                </div>
            </form>
        </>
    )
}

export default CambiarNombre;