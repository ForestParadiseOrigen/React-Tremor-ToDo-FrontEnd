import { useState } from 'react';
import { SearchIcon} from "@heroicons/react/solid";
import { TextInput, Button } from "@tremor/react";
import NewTarea from './form/NewTarea';

function DinamicBar({inputBuscarTareaHandle}) {
  const [modo, setModo] = useState('buscar'); // Estado para el modo actual

  const cambiarModo = () => {
    setModo(modo === 'buscar' ? 'crearTarea' : 'buscar');
  };

  return (
    <div className="flex items-center justify-center p-2 mt-2.5">
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
  );
}

export default DinamicBar;
