import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

function Login (){
    const API_URL = "http://localhost:5000/";
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [dataTag, setDataTag] = useState([]);

    async function validacion(event) {
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
    
          const usuarioValido = info.data.find(user => user.nombres === nombre && user.contrasena === contrasena);
    
          localStorage.setItem('user', usuarioValido)
    
          if (usuarioValido) {
            function generateUUID() { // Public Domain/MIT
                var d = new Date().getTime();//Timestamp
                var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random() * 16;//random number between 0 and 16
                    if(d > 0){//Use timestamp until depleted
                        r = (d + r)%16 | 0;
                        d = Math.floor(d/16);
                    } else {//Use microseconds since page-load if supported
                        r = (d2 + r)%16 | 0;
                        d2 = Math.floor(d2/16);
                    }
                    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
    
              }
             
              let __id;
              let _nombres;
              let _email;
              let _contrasena;
              let _fotoPerfil
    
              const usuarioLogueado = [
                __id = usuarioValido._id,
                _nombres = usuarioValido.nombres,
                _email = usuarioValido.email,
                _contrasena = usuarioValido.contrasena,
                _fotoPerfil = usuarioValido.fotoPerfil
              ];
    
              const usuarioString = JSON.stringify(usuarioLogueado);
              localStorage.setItem('usuario', usuarioString);
    
              
            const UUII = generateUUID();
    
    
            sessionStorage.setItem('key', UUII);
    
            navigate("/"); // Redirige a la ruta deseada después del inicio de sesión exitoso
          } else {
            console.log("Nombre de usuario o contraseña incorrectos");
          }
    
    
        } catch (err) {
          console.error('Algo anda mal aquí bro...', err);
        }
      }
    
      const inputNombre = (event) => {
        const value = event.target.value;
        setNombre(value);
      }
    
      const inputContrasena = (event) => {
        const value = event.target.value;
        setContrasena(value);
      }

    return(
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Iniciar Sesion</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={validacion}>

                    <div>
                        <label htmlFor="text" className="flex text-sm font-medium leading-6 text-gray-900">Nombres</label>
                        <div className="mt-2">
                            <input
                                value={nombre}
                                onChange={inputNombre}
                                id="Nombres"
                                name="Nombres"
                                type="text"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">¿Olvidaste tu contraseña?</a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                value={contrasena}
                                onChange={inputContrasena}
                                id="contrasena"
                                name="contrasena"
                                type="password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Ingresar</button>
                    </div>
                </form>

                <a href="/registro" className="mt-10 text-center text-sm text-gray-500">
                    No tengo una cuenta
                </a>
            </div>
        </div> 

    )
}

export default Login;