import React from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from './Modal'
import { EditarU } from './EditarU';
import { useState, useEffect } from 'react';
import { FaX } from "react-icons/fa6";

function Tabla_usuarios(props) {
    const [showDivMap, setShowDivMap] = useState({});

    const toggleDiv = (itemId) => {
        setShowDivMap(prevState => ({
            ...prevState,
            [itemId]: !prevState[itemId] || false
        }));
    };

    const closeDiv = (itemId) => {
        setShowDivMap(prevState => ({
            ...prevState,
            [itemId]: false
        }));
    };
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
    const currentItems = props.usuario.slice(indexOfFirstItem, indexOfLastItem);

    const renderTable = () => {
        return (
            <Table class="table table-auto border-collapse border border-grotto self-center w-full">

                <thead>
                    <tr class="border-none bg-royal text-white">
                        <th class="p-2 py-4 border border-mid tracking-wider text-center">Nombre</th>
                        <th class="p-2 py-4 border border-mid tracking-wider text-center">Direccion</th>
                        <th class="p-2 py-4 border border-mid tracking-wider text-center">Usuario</th>
                        <th class="p-2 py-4 border border-mid tracking-wider text-center">Sucursal</th>
                        <th class="p-2 py-4 border border-mid tracking-wider text-center">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {currentItems.map((item) => {
                        const itemId = item.user_id;
                        const contra = item.contrasenia
                        return (
                            <>
                                <tr class="even:bg-grotto odd:bg-baby" key={item.user_id}>
                                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.nombre} </td>
                                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.direccion} </td>
                                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.nombre_de_usuario} </td>
                                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.sucursal} </td>
                                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">
                                        <div >
                                            <button class="bg-royal text-white font-semibold p-1 rounded-xl pl-2 pr-2" onClick={() => toggleDiv(itemId)}>Editar</button>
                                            {' '}
                                        </div>
                                    </td>
                                </tr>
                                <div class="w-full h-full flex flex-row">
                                    {showDivMap[itemId] && <>  <EditarU buttonLabel="Editar" itemId={itemId} item={item} updateState={props.updateState} contra={contra}></EditarU> </>}
                                </div>
                            </>
                        )
                    })}
                </tbody>

            </Table>
        )

    }
    const renderPagination = () => {

        const totalPages = Math.ceil(props.usuario.length / itemsPerPage);
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
                            Math.min(prevPage + 1, Math.ceil(props.usuario.length / itemsPerPage))
                        )
                    }
                    disabled={currentPage === Math.ceil(props.usuario.length / itemsPerPage)}
                    class="font-semibold mx-2">
                    Siguiente
                </button>
            </div>
        );
    };

    const items = props.usuario.map(item => {
        const itemId = item.user_id;
        const contra = item.contrasenia

        return (
            <>
                <tr class="even:bg-grotto odd:bg-baby" key={item.user_id}>
                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.nombre} </td>
                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.direccion} </td>
                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.nombre_de_usuario} </td>
                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.sucursal} </td>
                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">
                        <div >
                            <button class="bg-royal text-white font-semibold p-1 rounded-xl pl-2 pr-2" onClick={() => toggleDiv(itemId)}>Editar</button>

                            {' '}
                        </div>
                    </td>
                </tr>
                <div class="w-full h-full flex flex-row">
                    {showDivMap[itemId] && <>  <EditarU buttonLabel="Editar" itemId={itemId} item={item} updateState={props.updateState} contra={contra}></EditarU> </>}
                </div>
            </>
        )
    })


    return (
        <>
            <section class="flex flex-col">
                {Object.keys(showDivMap).map(itemId => (
                    showDivMap[itemId] && (
                        <div key={`close-${itemId}`} class="w-full flex flex-col">
                            <button class="z-[1000] w-1/5 translate-y-[-4.5rem] self-end flex fixed  justify-end" onClick={() => closeDiv(itemId)}> <FaX class="h-auto w-[1.3rem] drop-shadow-2xl fill-white sm:w-[2rem]" /> </button>
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

        </>

    )
}

export default Tabla_usuarios;

/*cambios anteriores
<ModalForm buttonLabel="Editar" item={item} updateState={props.updateState} />*/