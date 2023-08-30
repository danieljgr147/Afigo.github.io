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
        
        return (
            <>
                <tr class="even:bg-grotto odd:bg-baby" key={item.user_id}>
                    <td class="p-2 py-4 border-b border-mid tracking-wider">{item.nombre} </td>
                    <td class="p-2 py-4 border-b border-mid tracking-wider">{item.direccion} </td>
                    <td class="p-2 py-4 border-b border-mid tracking-wider">{item.nombre_de_usuario} </td>
                    <td class="p-2 py-4 border-b border-mid tracking-wider">
                        <div style={{ width: "110px" }}>
                            <button onClick={() => toggleDiv(itemId)}>Editar</button>

                            {' '}
                        </div>
                    </td>
                </tr>
                <div class="w-full h-full flex flex-row">
                    {showDivMap[itemId] && <> <FaX class="absolute  w-7 h-auto z-40" onClick={() => closeDiv(itemId)} /> <EditarU buttonLabel="Editar" item={item} updateState={props.updateState}></EditarU></>}
                </div>
            </>
        )
    })

    return (
        <>
            <Table class="table table-auto border-collapse border border-grotto self-center w-full">

                <thead>
                    <tr class="border-none bg-royal text-white">
                        <th class="p-2 py-4 border border-mid tracking-wider">Nombre</th>
                        <th class="p-2 py-4 border border-mid tracking-wider">Direccion</th>
                        <th class="p-2 py-4 border border-mid tracking-wider">Usuario</th>
                        <th class="p-2 py-4 border border-mid tracking-wider">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {items}
                </tbody>

            </Table>

        </>

    )
}

export default Tabla_usuarios;

/*cambios anteriores
<ModalForm buttonLabel="Editar" item={item} updateState={props.updateState} />*/