import React, { useEffect, useState } from 'react';

export function DetalleP({ buttonLabel, item, updateState, IdPedido }) {
    const id_pedido=IdPedido;
    const [detalle, setDetalle] = useState([]);
   
    console.log("*********")
    console.log(id_pedido)

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
        return (
            <>
                <tr key={item.id_detalle} class="even:bg-grotto odd:bg-baby">
                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.nombre_producto}</td>
                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.cant_producto}</td>
                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.descripcion}</td>

                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">Editar</td>
                </tr>
            </>
        );
    });

    return (
        <section class="fixed top-40 left-1 w-full h-full flex flex-col items-center">
            <div class="min-w-[45%] bg-white p-1  flex flex-col shadow-[4px_10px_60px_800px_rgba(0,0,0,0.1)] rounded-xl" >
                <div class="rounded-2xl">
                    <table class="table-auto border-collapse border border-grotto self-center w-full">
                        <thead>
                            <tr class="border-none bg-royal text-white">
                                <th class="p-2 py-4 border border-mid tracking-wider text-center">Producto</th>
                                <th class="p-2 py-4 border border-mid tracking-wider text-center">Cantidad</th>
                                <th class="p-2 py-4 border border-mid tracking-wider text-center">Descripcion</th>
                                <th class="p-2 py-4 border border-mid tracking-wider text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>




    )
}