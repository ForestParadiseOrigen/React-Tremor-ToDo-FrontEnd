import { Grid, Col, Title, Text, TextInput, Button, Flex } from "@tremor/react";
import { ExternalLinkIcon } from '@heroicons/react/solid'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CambiarFoto () {
    const navigate = useNavigate()
    const API_URL = "http://localhost:5000/"
    
    const usuarioRecuperado = localStorage.getItem('usuario');
    const usuarioObjeto = JSON.parse(usuarioRecuperado)

    const [changePhotoUrl, setChangePhotoUrl] = useState("");
    const [photoUser, setPhotoUser] = useState(localStorage.getItem("photoUserLocal") || "");

    const changeUrlPrev = (event) => {
        const value = event.target.value;
        localStorage.removeItem("photoUserLocal");
        setChangePhotoUrl(value);

    };

    const changeUrl = (event) => {
        event.preventDefault();
        localStorage.clean;
        actualizar()
    };

    const actualizar = async () => {
        // Tu código de actualización de contraseña aquí
        const usuarioRecuperado = localStorage.getItem('usuario');
        const usuarioObjeto = JSON.parse(usuarioRecuperado);

        try {
            const paquete = { fotoPerfil: changePhotoUrl };
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

                alert("Se ha cambiado tu imagen de perfil.");

        } catch (err) {
            localStorage.clear();
            console.log("Error en la solicitud fetch:", err);
        }

        navigate("/ingreso")

        // Esto recarga la página, está al final para que termine de registrar el pendiente.
        location.reload();

    }
    
    console.log(changePhotoUrl);
    console.log(usuarioObjeto[4]);

    return(
        <>
            <Flex className="items-start pb-5 px-5 flex-col justify-end border-b">
                <article className="text-start">
                    <h1 className="text-3xl font-bold">Cambiar foto de perfil</h1>
                    <Text>Seccion en la que podras cambiar facilmente tu foto de perfil.</Text>
                </article>
            </Flex>
            <div className="border-b p-5 ">
                <Grid numItemsLg={3} className="gap-5">
                    <Col numColSpan={2} className="flex align-center justify-center flex-col gap-5">
                        <article className="flex flex-col text-start justify-center">
                            <Title className="text-2xl">Agregar una URl</Title>
                            <Text className="text-base">Aquí puedes cambiar tu foto de perfil, ingresando el link de la foto que tu quieras.</Text>
                        </article>
                        <form className="flex gap-5" onSubmit={changeUrl}>
                            <TextInput
                                onChange={changeUrlPrev} 
                                value={changePhotoUrl}
                                icon={ExternalLinkIcon}
                                type="url"
                                placeholder="Agregar URL..." />
                            <Button
                                type="submit"
                                className="border-violet-600 bg-violet-800 hover:bg-violet-600 hover:border-violet-600 shadow-violet-600">Cambiar</Button>
                        </form>
                        <article className="flex flex-col text-start justify-center">
                            <Title className="text-2xl">Sube un archivo (No es funcional aún)</Title>
                            <Text className="text-base">Tambien puedes subir la foto que desees.</Text>
                        </article>
                        <form className="flex gap-5 h-10">
                            <input
                                type="file"
                                name="file-img"
                                id="file-input-medium"
                                className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600
                                    file:border-0
                                    file:bg-gray-100 file:me-4
                                    file:py-3 file:px-4
                                    dark:file:bg-gray-700 dark:file:text-gray-400"/>
                            <Button type="submit" className="border-violet-600 bg-violet-800 hover:bg-violet-600 hover:border-violet-600 shadow-violet-600">Cambiar</Button>
                        </form>
                    </Col>
                    <Col numColSpan={1} className="flex align-center justify-center">
                        <img 
                            src={usuarioObjeto[4]}
                            width={250}
                            height={250}
                            alt="fotoUsuario"
                            className="rounded-full shadow-lg"
                        />
                    </Col>

                </Grid>
            </div>
        </>
    )
}

export default CambiarFoto;