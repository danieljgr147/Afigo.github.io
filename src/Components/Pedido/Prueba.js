
import { Nav } from "../Nav";
import { Sidebar } from "../Sidebar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { EditarV } from "./EditarV";
import { FaX } from "react-icons/fa6";
import { DetalleP } from "../Detalle/DetalleP";
import { FaPlus } from "react-icons/fa6";
import { useMediaQuery } from 'react-responsive';

export function Prueba(props) {
    const sucursal = sessionStorage.getItem('usuario_sucursal')
    const userType = sessionStorage.getItem('usuario_admin')
    const token = sessionStorage.getItem('Token')

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
        scrollToTop();
        setShowDivMap1(prevState => ({
            ...prevState,
            [IdPedido]: !prevState[IdPedido] || false
        }));
    };

    const closeDiv = (pedidoId) => {
        window.location.reload();
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

    const [pedido, setPedido] = useState([]);
    const data = {
        sucursal: sucursal,
        usuario_admin: parseInt(userType)
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        // Función para hacer la solicitud GET a la API
        const fetchPedido = async () => {
            try {
                const param = "Pedido";
                const response = await fetch("https://AfigoControl.somee.com/API/api/pedido/ByTypePedido", {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': "application/json; charset=utf-8",
                        "Authorization": sessionStorage.getItem('Token')
                    }
                })
                const jsonData = await response.json();
                // Ordenar los pedidos por fecha en orden descendente (de más nuevo a más antiguo)
                const sortedPedido = jsonData.sort((a, b) => {
                    return new Date(b.fecha_pedido) - new Date(a.fecha_pedido);
                });
                setPedido(sortedPedido); // Actualiza el estado con los datos ordenados
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchPedido(); // Llama a la función para obtener los datos cuando el componente se monta
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = pedido.slice(indexOfFirstItem, indexOfLastItem);

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

    const renderTable = () => {
        const pedidoId = pedido.id_pedido;
        const IdPedido = pedido.id_pedido;
        const tipoFactura = pedido.factura_electronica === 0 ? "Factura electrónica" : "Factura física";

        return (
            <table class="table-auto border-collapse border border-grotto self-center w-[100%]">
                <thead>
                    <tr class="border-none bg-royal text-white">
                        <th class="p-2 py-4 border border-mid tracking-wider"> </th>
                        <th class="p-2 py-4 border border-mid tracking-wider">Vendendor</th>
                        <th class="p-2 py-4 border border-mid tracking-wider">Cliente</th>
                        <th class="p-2 py-4 border border-mid tracking-wider">Factura</th>
                        <th class="p-2 py-4 border border-mid tracking-wider">Datos de factura</th>
                        <th class="p-2 py-4 border border-mid tracking-wider">Envio</th>
                        <th class="p-2 py-4 border border-mid tracking-wider">Direccion</th>
                        <th class="p-2 py-4 border border-mid tracking-wider">Estado</th>
                        <th class="p-2 py-4 border border-mid tracking-wider">Urgencia</th>
                        <th class="p-2 py-4 border border-mid tracking-wider">Fecha</th>
                        <th class="p-2 py-4 border border-mid tracking-wider">Actualizacion</th>
                        <th class="p-2 py-4 border border-mid tracking-wider">Acciones</th>
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
                                <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.nombre}</td>
                                <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.nombre_cliente}</td>
                                <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{tipoFactura}</td>
                                <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.detalle_factura}</td>
                                <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.metodo_envio}</td>
                                <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.direccion_envio}</td>
                                <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.estado}</td>
                                <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.urgencia}</td>
                                <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{fechaFormateada}</td>
                                <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{fechaAc}</td>
                                <td class="p-2 py-4 border-b border-mid tracking-wider text-center">
                                    <div class="flex flex-col">
                                        <button onClick={() => toggleDiv1(IdPedido)} class="w-[77.63px] p-1 font-semibold bg-royal text-white rounded-xl pl-2 pr-2 mb-1 hover:text-grotto ">Ver mas</button>
                                        <button onClick={() => toggleDiv(pedidoId)} class="w-[77.63px] p-1 font-semibold bg-royal text-white rounded-xl pl-2 pr-2 hover:text-grotto ">Editar</button>
                                    </div>
                                </td>
                            </tr><div class="w-full h-full flex flex-row">
                                    {showDivMap[pedidoId] && <>  <EditarV buttonLabel="Editar" item={item} updateState={props.updateState} pedidoId={pedidoId}></EditarV>  </>}

                                </div><div>{showDivMap1[IdPedido] && <> <DetalleP buttonLabel="Ver mas" item={item} updateState={props.updateState} IdPedido={IdPedido}></DetalleP> </>}</div></>
                        );
                    })}
                </tbody>
            </table>
        );
    };

    const renderPagination = () => {
        const totalPages = Math.ceil(pedido.length / itemsPerPage);
        const maxButtonsToShow = 9;
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
      
            <ul className="flex space-x-2">
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
                  Math.min(prevPage + 1, Math.ceil(pedido.length / itemsPerPage))
                )
              }
              disabled={currentPage === Math.ceil(pedido.length / itemsPerPage)}
              class="font-semibold mx-2">
              Siguiente
            </button>
          </div>
        );
      };
      
    return (
        <section class="flex flex-row w-full h-full">
            <section class="flex flex-col w-10/12 ml-14 ">
                <div class="flex content-center items-center shadow-xl sm:rounded-t-xl ml-4">
                    {renderTable()}
                </div>
                <div class="w-1/2 flex my-4 self-center rounded-xl shadow-xl bg-grotto">
                    {renderPagination()}
                </div>
            </section>
        </section>


    );
}