import React, { useEffect, useState } from 'react';
import { EditarD } from './EditarD';
import { FaX } from "react-icons/fa6";
import { AgregarD } from './AgregarD';
import { useNavigate } from "react-router-dom";


export function DetalleP({ buttonLabel, item, updateState, IdPedido }) {
    const id_pedido = IdPedido;
    const [detalle, setDetalle] = useState([]);
    const [editedItem, setEditedItem] = useState(item);

    const navigate = useNavigate()
    const [showDivMap, setShowDivMap] = useState({});
    const [showDiv, setShowDiv] = useState({})
    const [showDiv1, setShowDiv1] = useState(true);


    const toggleDiv = (IdDetalle) => {
        setShowDivMap(prevState => ({
            ...prevState,
            [IdDetalle]: !prevState[IdDetalle] || false
        }));
    };

    const closeDiv = (IdDetalle) => {
        setShowDivMap(prevState => ({
            ...prevState,
            [IdDetalle]: false
        }));
    };

    const toggleDiv1 = (id_pedido) => {
        setShowDiv(prevState => ({
            ...prevState,
            [id_pedido]: !prevState[id_pedido] || false
        }));
        toggleTabla();
    };

    const closeDiv1 = (id_pedido) => {
        setShowDiv(prevState => ({
            ...prevState,
            [id_pedido]: false
        }));
    };

    const toggleTabla = () => {
        setShowDiv1(!showDiv1);
    };

    useEffect(() => {

        // Función para hacer la solicitud GET a la API
        const fetchDetalle = async () => {
            try {
                const response = await fetch("https://AfigoControl.somee.com/API/api/detalle/All", {
                    method: 'POST',
                    body: id_pedido,
                    headers: {
                        'Content-Type': "application/json; charset=utf-8",
                        "Authorization": sessionStorage.getItem('Token')
                    }
                });
                const jsonData = await response.json();
                setDetalle(jsonData); // Actualiza el estado con los datos de la API
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchDetalle(); // Llama a la función para obtener los datos cuando el componente se monta
    }, []);

    // Mapea los datos en la tabla
    const tableRows = detalle.map((item) => {
        const IdDetalle = item.id_detalle;
        console.log("id detalle")
        console.log(IdDetalle)

        const handleDeleteClick = () => {
            eliminarDetalle(IdDetalle);
        };

        return (
            <>
                <tr key={item.id_detalle} class="even:bg-grotto odd:bg-baby">
                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.nombre_producto}</td>
                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.cant_producto}</td>
                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.descripcion}</td>
                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.estado}</td>
                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">
                        <div class="flex flex-col">
                        <button onClick={() => toggleDiv(IdDetalle)} class="font-bold hover:text-grotto ">Editar</button>
                        <button onClick={handleDeleteClick} class="font-bold hover:text-grotto">
                            Eliminar
                        </button>
                        </div>
                    </td>
                </tr>
                <div>
                    {showDivMap[IdDetalle] && <EditarD IdDetalle={IdDetalle} id_pedido={id_pedido} item={item}></EditarD>}
                </div>
            </>
        );
    });

    const eliminarDetalle = async (idDetalle) => {
        console.log(idDetalle)
        console.log("*********")
        try {
            const params = {
                id_detalle: idDetalle
            };
            console.log("parametros")
            console.log(params)
            const apiUrl = "https://AfigoControl.somee.com/API/api/detalle/delete";
            const response = await fetch(apiUrl, {
                method: 'DELETE',
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: sessionStorage.getItem('Token'),
                },
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el detalle de pedido');
            } else {
                console.log("eliminado correctamente");
            }

        } catch (error) {
            console.error('Error al eliminar el detalle:', error);
        }
    };



    return (

        <section class="absolute top-40 left-1 w-full h-full flex flex-col items-center">
            <div class="max-w-[50%] w-[90%] bg-white p-1  flex flex-col shadow-[4px_10px_60px_800px_rgba(0,0,0,0.3)] rounded-xl" >
                <div>
                    <h2 class="text-xl font-semibold text-navy">Pedido para: {editedItem.nombre_cliente}</h2>
                    <button class="bg-navy text-white font-semibold p-3 pl-4 pr-4 mb-8 rounded-xl" onClick={() => toggleDiv1(id_pedido)}>Agregar mas</button>
                    <div>
                        {showDiv[id_pedido] && <AgregarD id_pedido={id_pedido}></AgregarD>}

                    </div>
                </div>
                {showDiv1 && <div class="rounded-2xl overflow-x-auto overflow-y-auto ">
                    <table class="table-auto border-collapse border border-grotto self-center w-full ">
                        <thead>
                            <tr class="border-none bg-royal text-white">
                                <th class="p-2 py-4 border border-mid tracking-wider text-center">Producto</th>
                                <th class="p-2 py-4 border border-mid tracking-wider text-center">Cantidad</th>
                                <th class="p-2 py-4 border border-mid tracking-wider text-center">Descripcion</th>
                                <th class="p-2 py-4 border border-mid tracking-wider text-center">Estado</th>
                                <th class="p-2 py-4 border border-mid tracking-wider text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows}
                        </tbody>
                    </table>

                </div>}

            </div>
        </section>




    )
}