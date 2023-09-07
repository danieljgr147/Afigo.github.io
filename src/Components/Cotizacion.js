import { Nav } from "./Nav"
import { Sidebar } from "./Sidebar"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { EditarC } from "./EditarC";
import { FaX } from "react-icons/fa6";
import { DetalleP } from "./DetalleP";

export function Cotizacion(props) {
    const [cotizacion, setCotizacion] = useState([]);
    const navigate=useNavigate()
    const [showDivMap, setShowDivMap] = useState({});
    const [showDivMap1, setShowDivMap1] = useState({});
    const [showDiv, setShowDiv] = useState(false);

    const toggleDiv = (pedidoId) => {
        setShowDivMap(prevState => ({
            ...prevState,
            [pedidoId]: !prevState[pedidoId] || false
        }));
    };
    const toggleDiv1 = (IdPedido) => {
        setShowDivMap1(prevState => ({
            ...prevState,
            [IdPedido]: !prevState[IdPedido] || false
        }));
    };

    const closeDiv = (pedidoId) => {
        setShowDivMap(prevState => ({
            ...prevState,
            [pedidoId]: false
        }));
    };

    const closeDiv1 = (IdPedido) => {
        setShowDivMap1(prevState => ({
            ...prevState,
            [IdPedido]: false
        }));
    };

    const apiUrl = 'https://AfigoControl.somee.com/API/api/pedido/ByTypeCotizacion';
    const tipoPedido = 'cotizacion';
    const urlCompleta = `${apiUrl}?tipo_pedido=${tipoPedido}`;

    useEffect(() => {
        // Función para hacer la solicitud GET a la API
        const fetchCotizacion = async () => {
            try {
                const param = "Cotizacion";
                const response = await fetch(urlCompleta, {
                    method: 'GET',
                    headers: {
                        'Content-Type': "application/json; charset=utf-8",
                        "Authorization": sessionStorage.getItem('Token')
                    }
                })
                const jsonData = await response.json();
                setCotizacion(jsonData); // Actualiza el estado con los datos de la API
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchCotizacion(); // Llama a la función para obtener los datos cuando el componente se monta
    }, []);

    // Mapea los datos en la tabla
    const tableRows = cotizacion.map((item) => {
        const pedidoId = item.id_pedido;
        const IdPedido = item.id_pedido;
        // Supongamos que 'fecha' es la fecha en formato YYYY-MM-DD T00:00:00
        const fecha = item.fecha_pedido;

        // Crear un objeto Date a partir de la cadena de fecha
        const date = new Date(fecha);

        // Obtener el año, mes y día por separado
        const año = date.getFullYear();
        const mes = String(date.getMonth() + 1).padStart(2, "0"); // Agrega ceros a la izquierda si es necesario
        const día = String(date.getDate()).padStart(2, "0"); // Agrega ceros a la izquierda si es necesario

        // Formatear la fecha en el formato deseado (YYYY-MM-DD)
        const fechaFormateada = `${año}-${mes}-${día}`;
        console.log("fecha formateada****")
        console.log(item.id_pedido)
        console.log(fechaFormateada); 

        return (
            <>
                <tr key={pedidoId} class="even:bg-grotto odd:bg-baby">
                <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{fechaFormateada}</td>
                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.nombre}</td>
                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.nombre_cliente}</td>
                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.detalle_factura}</td>
                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.estado}</td>
                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center"><div class="flex flex-col"><button onClick={toggleDiv1} class="p-1 font-bold hover:text-grotto ">Ver mas</button> <button onClick={() => toggleDiv(pedidoId)} class="font-bold hover:text-grotto ">Editar</button></div></td>
                </tr>
                <div class="w-full h-full flex flex-row">
                    {showDivMap[pedidoId] && <>  <EditarC buttonLabel="Editar" item={item} updateState={props.updateState} pedidoId={pedidoId}></EditarC> </>}
                    <div>{showDivMap1[IdPedido] && <> <DetalleP buttonLabel="Ver mas" item={item} updateState={props.updateState} IdPedido={IdPedido} ></DetalleP> </>}</div>
                </div>
            </>
        );
    });


    return (
        <><Nav /><section class="flex flex-row w-full">
            <div>
                <Sidebar class="w-3/12" />
            </div>
            <section class="alex flex-col w-9/12 ml-14">
                <div class="m-5 p-5 ">
                    <button class="bg-grotto p-5 rounded-full font-bold border-none shadow-md text-royal drop-shadow-2xl" onClick={() => navigate('/formularioCotizacion')}>Nueva Cotizacion</button>
                </div>
                {Object.keys(showDivMap).map(itemId => (
                    showDivMap[itemId] && (
                        <div key={`close-${itemId}`} class="w-full flex flex-col">
                            <button class="z-[1000] w-1/5 translate-y-[-4.5rem] self-end flex fixed  justify-end" onClick={() => closeDiv(itemId)}> <FaX class="h-auto w-[1.3rem] drop-shadow-2xl fill-white sm:w-[2rem]" /> </button>
                        </div>
                    )
                ))}
                
                {showDiv &&  <div class="w-full flex flex-col">
                            <button class="z-[2000] w-1/5 translate-y-[-4.5rem] self-end flex fixed  justify-end" onClick={closeDiv1}> <FaX class="h-auto w-[1.3rem] drop-shadow-2xl fill-white sm:w-[2rem]" /> </button>
                        </div>}
                <div class="flex content-center items-center overflow-x-auto overflow-y-auto  shadow-xl sm:rounded-t-xl ml-4">
                    <table class="table-auto border-collapse border border-grotto self-center w-full">

                        <thead>
                            <tr class="border-none bg-royal text-white">
                                <th class="p-2 py-4 border border-mid tracking-wider">Fecha</th>
                                <th class="p-2 py-4 border border-mid tracking-wider">Vendendor</th>
                                <th class="p-2 py-4 border border-mid tracking-wider">Cliente</th>
                                <th class="p-2 py-4 border border-mid tracking-wider">Informacion</th>
                                <th class="p-2 py-4 border border-mid tracking-wider">Estado</th>
                                <th class="p-2 py-4 border border-mid tracking-wider">Acciones</th>
                            </tr>
                        </thead> 
                        <tbody>
                            {tableRows}
                        </tbody>

                    </table>
                </div>
            </section>
        </section></>

        
    )
}