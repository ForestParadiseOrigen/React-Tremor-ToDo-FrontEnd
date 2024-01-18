import { useState, useEffect } from "react";
import { Text, TextInput, Button } from "@tremor/react";
import { useNavigate } from "react-router-dom";

function CambiarContrasena () {
    const navigate = useNavigate();

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
    
    const [inputPassword, setInpuPassword] = useState("");

    const [inputNewPass, setInputNewPass] = useState("");
    const [inputConfPass, setInputConfPass] = useState("");

    
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfPassword, setErrorConfPassword] = useState("");

    

    const inputPasswordHandle = (event) => {
        const value = event.target.value;
        setInpuPassword(value);
        setErrorPassword("");
    }

    const validarPassword = () => {
        const minLength = 8;

        if (inputPassword.length < minLength) {
            setErrorConfPassword("La contraseña debe tener al menos 8 caracteres.");
            return false;
        }
        
        return true;
    };

    const validarConfPassword = () => {
        const minLength = 8;
        const tieneCaracterEspecial = /[@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(inputNewPass);
        const tieneNumero = /\d/.test(inputNewPass);

        if (inputNewPass.length < minLength) {
            setErrorConfPassword("La contraseña debe tener al menos 8 caracteres.");
            return false;
        } else if (!tieneCaracterEspecial) {
            setErrorConfPassword("La contraseña debe contener al menos un carácter especial.");
            return false;
        } else if (!tieneNumero) {
            setErrorConfPassword("La contraseña debe contener al menos un número.");
            return false;
        }else{
            if((inputConfPass.length !== 0) && (inputPassword !== inputNewPass)){
                if ((inputNewPass === inputConfPass)) {
                    return true;
                }else{
                    setErrorConfPassword("Las contraseñas no coinciden.");
                    return false;
                }
            }
        }
    };

    const validacionPasswordHandle = (event) => {
        event.preventDefault();

        if (validarPassword() && validarConfPassword()) {
            // Realizar la actualización de la contraseña del usuario
            actualizarPasswordUsuario();
        }
    };

    const actualizarPasswordUsuario = async () => {
        // Tu código de actualización de contraseña aquí
        const usuarioRecuperado = localStorage.getItem('usuario');
        const usuarioObjeto = JSON.parse(usuarioRecuperado);
        const usuarioFiltrado = dataTag.filter(info => info._id === usuarioObjeto[0]);
        setUsuarioFiltradoById(usuarioFiltrado);

        try {
            const paquete = { contrasena: inputNewPass };

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
            localStorage.clear();

        } catch (err) {
            console.log("Error en la solicitud fetch:", err);
        }
            
            navigate('/ingreso') ;               
        location.reload();
        // Esto recarga la página, está al final para que termine de registrar el pendiente.
    }

    return(
        <>
            <article className="flex flex-col text-start justify-center mb-5 border-b py-5">
                <h1 className="text-3xl font-bold">Cambio de contraseña</h1>
                <Text className="text-base">Aquí puedes revisar y actualizar tu contraseña cuando quieras.</Text>
            </article>
            <form onSubmit={validacionPasswordHandle} className="flex flex-col gap-5 justify-start" >
                <TextInput
                    error={errorPassword.length > 0}
                    errorMessage={errorPassword}
                    type="password"
                    placeholder="Agregar vieja contraseña..."
                    onChange={inputPasswordHandle}
                    onBlur={validarPassword}
                    required
                />
                <TextInput
                    error={errorConfPassword.length > 0}
                    errorMessage={errorConfPassword}
                    type="password"
                    placeholder="Agregar nueva contraseña..."
                    onChange={(e) => setInputNewPass(e.target.value)}
                    
                    required
                />
                <TextInput
                    error={errorConfPassword.length > 0}
                    errorMessage={errorConfPassword}
                    type="password"
                    placeholder="Confirmar contraseña..."
                    onChange={(e) => setInputConfPass(e.target.value)}
                    onBlur={validarConfPassword}
                    required
                />
                <div className="flex">
                    <Button type="submit" className="border-violet-600 bg-violet-800 hover:bg-violet-600 hover:border-violet-600 shadow-violet-600">Actualizar</Button>
                </div>
            </form>
        </>
    )
}

export default CambiarContrasena;