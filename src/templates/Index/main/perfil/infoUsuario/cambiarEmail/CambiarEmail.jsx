import { useState, useEffect } from "react";
import { Text, TextInput, Button } from "@tremor/react";
import { useNavigate } from "react-router-dom";

function CambiarEmail () {
    const navigate = useNavigate()

    const API_URL = "http://localhost:5000/"
    const [dataTag, setDataTag] = useState([]);
    const [usuarioFiltradoById, setUsuarioFiltradoById] = useState([]);
    const [contrasena, setContrasena] = useState('');

    //Contraseña
    async function validacion(event) {
        console.log(contrasena, email.value)
        event.preventDefault(); // Evita que el formulario se envíe
    
        try {
          const response = await fetch(API_URL + "server/todoparadise/usuarios");
    
          if (!response.ok) {
            throw new Error(`Error al obtener los datos. Código de estado: ${response.status}`);
          }
    
          const info = await response.json();
    
          if (!info || !info.data) {
            throw new Error('La respuesta de la API no contiene un array de datos válido.');
          }
    
          setDataTag(info.data);
    
          const usuarioValido = info.data.find(user => user.contrasena === contrasena);

          if(usuarioValido){validacionEmailHandle(event)}
    
        } catch (err) {
          console.error('Algo anda mal aquí bro...', err);
        }
      }

    const inputContrasena = (event) => {
        const value = event.target.value;
        setContrasena(value);
    }

    useEffect(() => {
        const usuarioRecuperado = localStorage.getItem('usuario');
        const usuarioObjeto = JSON.parse(usuarioRecuperado);
        
        if (usuarioObjeto !== null) {
            const usuarioFiltrado = dataTag.filter(info => info._id === usuarioObjeto[0]);
            setUsuarioFiltradoById(usuarioFiltrado);
        }

    }, [dataTag])

    const [inputEmail, setInputEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    
    const inputEmailHandle = (event) => {
        const value = event.target.value;
        setInputEmail(value);
        setErrorEmail("");
    }
    
    const validarEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputEmail)) {
            setErrorEmail("Ingrese un correo electrónico válido.");
            return false;
        }
        return true;
    };

    const validacionEmailHandle = (event) => {
        event.preventDefault();

        if (validarEmail()) {
            // Realizar la actualización del usuario
            actualizarEmailUsuario();
        }
    };

    const actualizarEmailUsuario = async () => {
        // Tu código de actualización de usuario aquí
        const usuarioRecuperado = localStorage.getItem('usuario');
        const usuarioObjeto = JSON.parse(usuarioRecuperado);
        const usuarioFiltrado = dataTag.filter(info => info._id === usuarioObjeto[0]);
        setUsuarioFiltradoById(usuarioFiltrado);

        try {
            const paquete = { email: inputEmail };
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
                
                alert('Se ha cambiado tu email de usuario crrectamente. Debes volver a iniciar sesion.')
                localStorage.clear()
        } catch (err) {
            console.log("Error en la solicitud fetch:", err);
        }

        navigate('/ingreso')
        // Esto recarga la página, está al final para que termine de registrar el pendiente.
        location.reload();
    }

    return(
        <>
            <article className="flex flex-col text-start justify-center my-5 border-b pb-5">
                <h1 className="text-3xl font-bold">Cambio de email</h1>
                <Text className="text-base">Aquí puedes revisar y actualizar tu nombre y correo electrónico cuando quieras.</Text>
            </article>
            
            <form onSubmit={validacion} className="flex flex-col gap-5 justify-start border-b pb-5" >
                <TextInput
                    error={errorEmail.length > 0}
                    errorMessage={errorEmail}
                    id="email"
                    type="email"
                    placeholder="Agregar correo electrónico..."
                    onChange={inputEmailHandle}
                    onBlur={validarEmail}
                />
                <TextInput
                    value={contrasena}
                    onChange={inputContrasena}
                    id="contrasena"
                    name="contrasena"
                    type="password"
                    required
                    placeholder="Agrega tu contraseña"/>
                <div className="flex">
                    <Button type="submit" className="border-violet-600 bg-violet-800 hover:bg-violet-600 hover:border-violet-600 shadow-violet-600">Actualizar</Button>
                </div>
            </form>
        </>
    )
}
export default CambiarEmail;