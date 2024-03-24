import { Nav } from "../Nav"
import { Sidebar } from "../Sidebar"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { EditarProveedor } from "./EditarProveedor";
import { FaX } from "react-icons/fa6";
import { DetalleP } from "../Detalle/DetalleP";
import { FaPlus } from "react-icons/fa6";
import { useMediaQuery } from 'react-responsive';

export function Proveedor(props) {
    const sucursal = sessionStorage.getItem('usuario_sucursal')
    const userType = sessionStorage.getItem('usuario_admin')
    const [proveedor, setProveedor] = useState([]);
    const navigate = useNavigate()
    const [showDivMap, setShowDivMap] = useState({});
    const [showDivMap1, setShowDivMap1] = useState({});
    const [showDiv, setShowDiv] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    const toggleDiv = (pedidoId) => {
        scrollToTop();
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

    const apiUrl = 'https://AfigoControl.somee.com/API/api/pedido/ByTypeProveedor';
    const tipoPedido = 'Proveedor';
    const urlCompleta = `${apiUrl}?tipo_pedido=${tipoPedido}`;
    const data = {
        sucursal: sucursal,
        usuario_admin: parseInt(userType)
    };
    useEffect(() => {
        // Función para hacer la solicitud GET a la API
        const fetchProveedor = async () => {
            try {
                const param = "Proveedor";
                const response = await fetch("https://AfigoControl.somee.com/API/api/pedido/ByTypeProveedor", {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': "application/json; charset=utf-8",
                        "Authorization": sessionStorage.getItem('Token')
                    }
                })
                const jsonData = await response.json();
                const sortedProveedor = jsonData.sort((a, b) => {
                    return new Date(b.fecha_pedido) - new Date(a.fecha_pedido);
                });

                setProveedor(sortedProveedor); // Actualiza el estado con los datos ordenados
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchProveedor(); // Llama a la función para obtener los datos cuando el componente se monta
    }, []);

    const [windowDimensions, setWindowDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    });

    const updateWindowDimensions = () => {
        setWindowDimensions({
            height: window.innerHeight,
            width: window.innerWidth,
        });
    };

    useEffect(() => {
        // Suscribirse al evento de redimensionamiento al montar el componente
        window.addEventListener('resize', updateWindowDimensions);

        // Desuscribirse del evento al desmontar el componente para evitar pérdidas de memoria
        return () => {
            window.removeEventListener('resize', updateWindowDimensions);
        };
    }, []); // El array vacío como segundo argumento asegura que el efecto solo se ejecute una vez al montar el componente


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = windowDimensions.width < 640 ? 3 : 5;


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = proveedor.slice(indexOfFirstItem, indexOfLastItem);

    const formatDate = (dateString) => {
        if (!dateString) {
            return null;
        }

        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    const getBackgroundColor = (estado) => {
        switch (estado) {
            case 'Listo':
                return '#61934D';
            case 'Pendiente':
                return '#E9BF54';
            case 'Sin inventario':
                return '#BD6849';
            default:
                return ''; // Valor por defecto si el estado no coincide con ninguno de los casos anteriores
        }
    };

    // Mapea los datos en la tabla
    const renderTable = () => {
        const pedidoId = proveedor.id_pedido;
        const IdPedido = proveedor.id_pedido;
        const tipoFactura = proveedor.factura_electronica === 0 ? "Factura electrónica" : "Factura física";

        return (
            <table class="table-auto border-collapse border border-grotto self-center w-full">
                <thead class="">
                    <tr class="border-none bg-royal text-white">
                        <th class="p-2 py-2 border border-mid tracking-wider"> </th>
                        <th class="p-2 py-2 border border-mid tracking-wider">Fecha</th>
                        <th class="p-2 py-2 border border-mid tracking-wider">Vendedor</th>
                        <th class="p-2 py-2 border border-mid tracking-wider">Cliente</th>
                        <th class="p-2 py-2 border border-mid tracking-wider">Informacion</th>
                        <th class="p-2 py-2 border border-mid tracking-wider">Estado</th>
                        <th class="p-2 py-2 border border-mid tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item) => {
                        const pedidoId = item.id_pedido;
                        const IdPedido = item.id_pedido;
                        const tipoFactura = item.factura_electronica === 0 ? "Factura electrónica" : "Factura física";
                        const fechaFormateada = formatDate(item.fecha_pedido);
                        const fechaAc = formatDate(item.fecha_edicion);
                        const backgroundColor = getBackgroundColor(item.estado);

                        return (
                            <><tr key={item.id} class="even:bg-grotto odd:bg-baby">
                                <td style={{ backgroundColor }}>   </td>
                                <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{fechaFormateada}</td>
                                <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.nombre}</td>
                                <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.nombre_cliente}</td>
                                <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.detalle_factura}</td>
                                <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.estado}</td>
                                <td class="p-2 py-4 border-b border-mid tracking-wider text-center">
                                    <div class="flex flex-col">
                                        <button onClick={() => toggleDiv1(IdPedido)} class="self-center w-[77.63px] p-1 font-semibold bg-royal text-white rounded-xl mb-1 hover:text-grotto ">Ver mas</button>
                                        <button onClick={() => toggleDiv(pedidoId)} class="self-center w-[77.63px] p-1 font-semibold bg-royal text-white rounded-xl pl-2 pr-2 hover:text-grotto ">Editar</button>
                                    </div>
                                </td>
                            </tr>
                                <div class="w-full h-full flex flex-row">
                                    {showDivMap[pedidoId] && <>  <EditarProveedor buttonLabel="Editar" item={item} updateState={props.updateState} pedidoId={pedidoId}></EditarProveedor> </>}
                                    <div>{showDivMap1[IdPedido] && <> <DetalleP buttonLabel="Ver mas" item={item} updateState={props.updateState} IdPedido={IdPedido} ></DetalleP> </>}</div>
                                </div></>
                        );
                    })}
                </tbody>
            </table>
        );
    };

    const renderPagination = () => {

        const totalPages = Math.ceil(proveedor.length / itemsPerPage);
        const maxButtonsToShow = windowDimensions.width < 1024 ? 4 : 9;
        const halfButtonsToShow = Math.floor(maxButtonsToShow / 2);

        let startPage, endPage;
        if (totalPages <= maxButtonsToShow) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= halfButtonsToShow) {
                startPage = 1;
                endPage = maxButtonsToShow;
            } else if (currentPage + halfButtonsToShow >= totalPages) {
                startPage = totalPages - maxButtonsToShow + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - halfButtonsToShow;
                endPage = currentPage + halfButtonsToShow;
            }
        }

        return (
            <div class="flex flex-row w-full p-2 justify-center items-center">
                <button
                    onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                    disabled={currentPage === 1}
                    class="font-semibold mx-2">
                    Previo
                </button>

                <ul className="hidden md:flex space-x-2">
                    {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((number) => (
                        <li key={number}>
                            <button
                                onClick={() => setCurrentPage(number)}
                                className={`py-2 px-4 rounded-xl font-semibold ${currentPage === number ? 'bg-royal text-white' : 'bg-gray-200'}`}
                            >
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>

                <button
                    onClick={() =>
                        setCurrentPage((prevPage) =>
                            Math.min(prevPage + 1, Math.ceil(proveedor.length / itemsPerPage))
                        )
                    }
                    disabled={currentPage === Math.ceil(proveedor.length / itemsPerPage)}
                    class="font-semibold mx-2">
                    Siguiente
                </button>
            </div>
        );
    };

    //funcion para el cambio del boton
    const isMobile = useMediaQuery({ maxWidth: 768 }); // Define aquí el ancho máximo para considerar como móvil

    const buttonContent = isMobile ? (
        <FaPlus size={24} /> // Mostrar solo el icono en dispositivos móviles
    ) : (
        'Nuevo Pedido' // Mostrar el texto en dispositivos de pantalla grande
    );


    return (
        <><Nav /><section class="flex flex-row w-full">
            <div class="h-full">
                <Sidebar class="w-3/12 h-full" />
            </div>
            <section class="flex flex-col w-9/12 ml-14">
                <div class="w-1/2 lg:m-5 p-5 ">
                    <button class="bg-grotto p-5 rounded-full font-bold border-none shadow-md text-royal drop-shadow-2xl" onClick={() => navigate('/FormularioProveedores')}>{buttonContent}</button>
                </div>
                {Object.keys(showDivMap).map(itemId => (
                    showDivMap[itemId] && (
                        <div key={`close-${itemId}`} class="w-full flex flex-col">
                            <button class="z-[1000] w-1/5 translate-y-[-4.5rem] self-end flex fixed  justify-end" onClick={() => closeDiv(itemId)}> <FaX class="h-auto w-[1.3rem] drop-shadow-2xl fill-white sm:w-[2rem]" /> </button>
                        </div>
                    )
                ))}


                {Object.keys(showDivMap1).map(item => (
                    showDivMap1[item] && (
                        <div key={`close-${item}`} class="w-full flex flex-col">
                            <button class="z-[1000] w-1/5 translate-y-[-4.5rem] self-end flex fixed  justify-end" onClick={() => closeDiv1(item)}> <FaX class="h-auto w-[1.3rem] drop-shadow-2xl fill-white sm:w-[2rem]" /> </button>
                        </div>
                    )
                ))}
                <div class="flex content-center items-center overflow-x-auto overflow-y-auto  shadow-xl sm:rounded-t-xl ml-4">
                    {renderTable()}
                </div>
                <div class="w-[80%] sm:w-1/2 md:w-2/3 lg:w-2/3 xl:w-1/2 flex my-4 self-center rounded-xl shadow-xl bg-grotto">
                    {renderPagination()}
                </div>
            </section>
        </section></>


    )
}