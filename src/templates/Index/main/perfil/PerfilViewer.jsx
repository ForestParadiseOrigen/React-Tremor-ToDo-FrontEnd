import CambiarFoto from "./cambiarFoto/CambiarFoto";
import InfoUsuario from "./infoUsuario/InfoUsuario";

function PerfilViewer () {
    return(
        <div id="PerfilViewer" className=" bg-white p-5 border-2 border-gray-200 rounded-lg dark:border-gray-700">
            <CambiarFoto />
            <InfoUsuario />
        </div>
    )
}

export default PerfilViewer;