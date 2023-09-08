import React from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from './Modal'
import { EditarU } from './EditarU';
import { useState } from 'react';
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

    const items = props.usuario.map(item => {
        const itemId = item.user_id;
        const contra = item.contrasenia

        return (
            <>
                <tr class="even:bg-grotto odd:bg-baby" key={item.user_id}>
                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.nombre} </td>
                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.direccion} </td>
                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.nombre_de_usuario} </td>
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
            <section class="grid">
                {Object.keys(showDivMap).map(itemId => (
                    showDivMap[itemId] && (
                        <div key={`close-${itemId}`} class="w-full flex flex-col">
                            <button class="z-[1000] w-1/5 translate-y-[-4.5rem] self-end flex fixed  justify-end" onClick={() => closeDiv(itemId)}> <FaX class="h-auto w-[1.3rem] drop-shadow-2xl fill-white sm:w-[2rem]" /> </button>
                        </div>
                    )
                ))}
                <div class="flex content-center items-center overflow-x-auto overflow-y-auto  shadow-xl sm:rounded-t-xl ml-4">
                    <Table class="table table-auto border-collapse border border-grotto self-center w-full">

                        <thead>
                            <tr class="border-none bg-royal text-white">
                                <th class="p-2 py-4 border border-mid tracking-wider text-center">Nombre</th>
                                <th class="p-2 py-4 border border-mid tracking-wider text-center">Direccion</th>
                                <th class="p-2 py-4 border border-mid tracking-wider text-center">Usuario</th>
                                <th class="p-2 py-4 border border-mid tracking-wider text-center">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {items}
                        </tbody>

                    </Table>
                </div>

            </section>

        </>

    )
}

export default Tabla_usuarios;

/*cambios anteriores
<ModalForm buttonLabel="Editar" item={item} updateState={props.updateState} />*/