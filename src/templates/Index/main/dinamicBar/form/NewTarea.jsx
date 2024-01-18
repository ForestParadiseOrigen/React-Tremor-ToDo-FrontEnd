import { PlusIcon } from "@heroicons/react/solid";
import { TextInput, Button } from "@tremor/react";
import { useState } from "react";

function NewTarea () {
    // Aqui se almacena la rul del servidor.
    const API_URL="http://localhost:5000/";

    // Declaramos las variables que se encargaran del almacenamiento de los datos que llegarán de la base de datos.
    const [dataTag, setDataTag] = useState([])

    const [titulo, setTitulo] = useState({});
    const [estado, setEstado] = useState(false);

    const usuarioRecuperado = localStorage.getItem('usuario');
    const usuarioObjeto = JSON.parse(usuarioRecuperado);
    if (usuarioObjeto !== null) {  // Verifica si usuarioObjeto no es null o undefined
        console.log(usuarioObjeto[0]);
    }
    
    const handleTitle = (event) => {
        const value = event.target.value;
        setTitulo(value);
    }

    const handleState = (event) => {
        const value = event.target.checked;
        setEstado(value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        nuevoPendiente()
    }

    const nuevoPendiente = async () => {
        
        try {
          const paquete = { titulo: titulo, estado: estado, idUsuario: usuarioObjeto[0]};
          console.log(paquete)
          
          await fetch(API_URL + "server/todoparadise/pendientes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paquete),
          })
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
              refreshPendientes();
            });
        } catch (err) {
          console.log("Error en la solicitud fetch:", err);
        }
    
        // Esto recarga la pagina, esta al final para que termine de regsitrar el pendiente.
        location.reload()
    };
    const prueba = usuarioObjeto[0]
    return(
        <>
            <form className="flex w-full" onSubmit={handleSubmit}>
                <TextInput
                    value={titulo.titulo}  
                    onChange={handleTitle}
                    icon={PlusIcon}
                    placeholder="Escribe algo..." />
                
                {/* Estado */}
                <input 
                    type="checkbox" 
                    name="estado" 
                    value={estado.estado} 
                    onChange={handleState} 
                    checked 
                    hidden/>

                <Button
                    size='xs'
                    type='submit'
                    className='ms-2 px-5 border-violet-400 bg-violet-600 hover:bg-violet-400 hover:border-violet-400 shadow-violet-600'>
                    
                    Crear
                </Button>
            </form>
        </>
    )
}

export default NewTarea;