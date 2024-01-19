import { useState } from 'react';
import { SearchIcon} from "@heroicons/react/solid";
import { TextInput, Button, Text } from "@tremor/react";
import NewTarea from './form/NewTarea';

function DinamicBar({inputBuscarTareaHandle}) {
  const [modo, setModo] = useState('buscar'); // Estado para el modo actual

  const cambiarModo = () => {
    setModo(modo === 'buscar' ? 'crearTarea' : 'buscar');
  };

  return (
    <>
      <article className="flex flex-col text-start justify-center px-5 mt-5 pt-2.5">
          {modo === 'buscar' && <h1 className="text-3xl font-bold">Buscador</h1>}
          {modo === 'crearTarea' && <h1 className="text-3xl font-bold">Crear tarea</h1>}
      </article>
      <div className="flex items-center justify-center px-5 mt-2.5">
        {modo === 'buscar' && <TextInput icon={SearchIcon} placeholder="Buscar..." onChange={inputBuscarTareaHandle}/>}
        {modo === 'crearTarea' && <NewTarea />}
        <div className="text-center border-s border-violet-200 ps-2 ms-2">
          <Button
            size="xs"
            onClick={cambiarModo}
            type='button'
            className="me-1 border-violet-600 bg-violet-800 hover:bg-violet-600 hover:border-violet-600 shadow-violet-600"
          >
            {modo === 'buscar' ? 'Crear una tarea' : 'Volver a buscar'}
          </Button>
        </div>
      </div>
    </>
  );
}

export default DinamicBar;
