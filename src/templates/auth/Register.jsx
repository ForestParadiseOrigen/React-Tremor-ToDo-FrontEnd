import { useState, useEffect } from "react";
import { Text, TextInput, Button } from "@tremor/react";

function Register () {
    const API_URL="http://localhost:5000/";

    const [estadoFront, setEstadoFront] = useState({});

    const [inputNombres, setInputNombres] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputConfPass, setInputConfPass] = useState("");

    const [errorNombres, setErrorNombres] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfPassword, setErrorConfPassword] = useState("");

    const inputNombresHandle = (event) => {
        const value = event.target.value;
        setInputNombres(value);
        setErrorNombres("");
    }

    const inputEmailHandle = (event) => {
        const value = event.target.value;
        setInputEmail(value);
        setErrorEmail("");
    }

    const inputPasswordHandle = (event) => {
        const value = event.target.value;
        setInputPassword(value);
        setErrorPassword("");
    }

    const validarNombres = () => {
        if (inputNombres.trim().length === 0) {
            setErrorNombres("Ingrese nombres válidos.");
            return false;
        }
        return true;
    };

    const validarEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputEmail)) {
            setErrorEmail("Ingrese un correo electrónico válido.");
            return false;
        }
        return true;
    };

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
        const tieneCaracterEspecial = /[@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(inputPassword);
        const tieneNumero = /\d/.test(inputPassword);

        if (inputPassword.length < minLength) {
            setErrorConfPassword("La contraseña debe tener al menos 8 caracteres.");
            return false;
        } else if (!tieneCaracterEspecial) {
            setErrorConfPassword("La contraseña debe contener al menos un carácter especial.");
            return false;
        } else if (!tieneNumero) {
            setErrorConfPassword("La contraseña debe contener al menos un número.");
            return false;
        }else{
            if((inputConfPass.length !== 0)){
                if ((inputPassword === inputConfPass)) {
                    return true;
                }else{
                    setErrorConfPassword("Las contraseñas no coinciden.");
                    return false;
                }
            }
        }
    };

    const validacionHandle = (event) => {
        event.preventDefault();

        if ((validarNombres() && validarEmail()) && (validarPassword() && validarConfPassword())) {
            // Realizar la actualización del usuario
            nuevoUsuario();
        }
    };



    const nuevoUsuario = async () => {
        try {
          const paquete = { nombres: inputNombres, email: inputEmail, contrasena: inputPassword };
          console.log(paquete)
          await fetch(API_URL + "server/todoparadise/usuarios", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paquete),
          })
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
            });
        } catch (err) {
          console.log("Error en la solicitud fetch:", err);
        }
    
        // Esto recarga la pagina, esta al final para que termine de regsitrar el pendiente.
        location.reload()
    };

    return(
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Registrarme</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={validacionHandle}>
                    <div>
                        <label htmlFor="text" className="flex text-sm font-medium leading-6 text-gray-900">Nombres</label>
                        <div className="mt-2">
                            <TextInput
                                error={errorNombres.length > 0}
                                errorMessage={errorNombres}
                                id="nombres"
                                type="text"
                                placeholder="Agregar nombres..."
                                onChange={inputNombresHandle}
                                onBlur={validarNombres}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="flex text-sm font-medium leading-6 text-gray-900">Corre Electronico</label>
                        <div className="mt-2">
                            <TextInput
                                error={errorEmail.length > 0}
                                errorMessage={errorEmail}
                                id="email"
                                type="email"
                                placeholder="Agregar correo electrónico..."
                                onChange={inputEmailHandle}
                                onBlur={validarEmail}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
                        </div>
                        <div className="mt-2">
                            <TextInput
                                error={errorConfPassword.length > 0}
                                errorMessage={errorConfPassword}
                                type="password"
                                placeholder="Agregar nueva contraseña..."
                                onChange={(e) => setInputPassword(e.target.value)}
                                
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Confirmar contraseña</label>
                        </div>
                        <div className="mt-2">
                            <TextInput
                                error={errorConfPassword.length > 0}
                                errorMessage={errorConfPassword}
                                type="password"
                                placeholder="Confirmar contraseña..."
                                onChange={(e) => setInputConfPass(e.target.value)}
                                onBlur={validarConfPassword}
                                required
                            />
                        </div>
                    </div>

                    <div>
                    <Button type="submit" className="border-violet-600 bg-violet-800 hover:bg-violet-600 hover:border-violet-600 shadow-violet-600">Registrarme</Button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Ya tengo una cuenta <br />
                    <a href="/ingreso">Iniciar Sesion</a>
                </p>
            </div>
        </div> 

    )
}

export default Register;