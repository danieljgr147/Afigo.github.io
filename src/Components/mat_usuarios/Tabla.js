import React from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from './Modal'

function Tabla_usuarios(props) {
    const items = props.usuario.map(item => {
        return (
            <tr class="even:bg-grotto odd:bg-baby" key={item.user_id}>
                <td class="p-2 py-4 border-b border-mid tracking-wider">{item.nombre} </td>
                <td class="p-2 py-4 border-b border-mid tracking-wider">{item.direccion} </td>
                <td class="p-2 py-4 border-b border-mid tracking-wider">{item.nombre_de_usuario} </td>
                <td class="p-2 py-4 border-b border-mid tracking-wider">
                    <div style={{ width: "110px" }}>
                        <ModalForm buttonLabel="Editar" item={item} updateState={props.updateState} />
                        {' '}
                    </div>
                </td>
            </tr>
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