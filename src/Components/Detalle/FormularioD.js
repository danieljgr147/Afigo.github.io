import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';


export function FormularioD({ idPedido }) {

    const IdPedido = idPedido;
    console.log("id en formulario")
    console.log(IdPedido)
    const [detalleG, setDetalleG] = useState([]);
    const initialState = {
        id_pedido: 1,
        nombre_producto: "",
        cant_producto: 1,
        descripcion: ""
    };
    const [detalle, setDetalle] = useState(initialState);


    const enviarDatosDetalle = async (e) => {
        e.preventDefault();
        // Crear una nueva copia del array detalle con valores limpios
        
        console.log("*****")
        console.log(detalle.cant_producto)
        try {

            const params = {
                id_pedido: IdPedido,
                nombre_producto: detalle.nombre_producto,
                cant_producto: parseInt(detalle.cant_producto),
                descripcion: detalle.descripcion
            }

            const response = await fetch("https://AfigoControl.somee.com/API/api/detalle/create", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': "application/json; charset=utf-8",
                    "Authorization": sessionStorage.getItem('Token')
                }
            });

            if (response.ok) {
                const data = await response.json();
                // Hacer algo con la respuesta de la API si es necesario
                console.log(data);
                setDetalle(initialState)
                fetchDetalle();
            } else {
                // Manejar errores de la API
                console.error("Error al enviar los datos del pedido a la API");
            }
        } catch (error) {
            console.error("Error en la solicitud POST:", error);
        }
    };



    // Función para hacer la solicitud GET a la API
    const fetchDetalle = async () => {
        try {


            const response = await fetch("https://AfigoControl.somee.com/API/api/detalle/All", {
                method: 'POST',
                body: IdPedido,
                headers: {
                    'Content-Type': "application/json; charset=utf-8",
                    "Authorization": sessionStorage.getItem('Token')
                }
            });
            const jsonData = await response.json();
            setDetalleG(jsonData); // Actualiza el estado con los datos de la API
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

    // Llama a la función para obtener los datos cuando el componente se monta


    const tableRows = detalleG.map((item) => {
        const IdDetalle = item.id_detalle;
        console.log("id detalle")
        console.log(IdDetalle)
        return (
            <>
                <tr key={item.id_detalle} class="even:bg-grotto odd:bg-baby">
                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.nombre_producto}</td>
                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.cant_producto}</td>
                    <td class="p-2 py-4 border-b border-mid tracking-wider text-center">{item.descripcion}</td>
                </tr>
                <div>
                </div>
            </>
        );
    });


    return (
        <section class="flex flex-col w-full justify-center items-center">
            <form class="flex flex-col w-1/2 justify-center items-center pt-10" >
                <div class="pt-8 text-center">
                    <h1 class="text-4xl font-bold text-royal pb-2">Agregar productos</h1>
                </div>
                <input
                    name="id_pedido"
                    id="id_pedido"
                    onChange={(e) => setDetalle({ ...detalle, id_pedido: e.target.value })}
                    value={1}
                    style={{ display: 'none' }}>

                </input>
                <div class="flex flex-col m-4 w-full justify-center items-center">
                    <label class="font-semibold">Producto</label>
                    <input class="border border-navy w-1/2"
                        type="text"
                        name="nombre_producto"
                        id="nombre_producto"
                        value={detalle.nombre_producto}
                        onChange={(e) => setDetalle({ ...detalle, nombre_producto: e.target.value })}
                    ></input>
                </div>
                <div class="flex flex-col m-4 w-full justify-center items-center">
                    <label class="font-semibold">Cantidad</label>
                    <input class="border border-navy w-1/2"
                        name="cant_producto"
                        id="cant_producto"
                        value={detalle.cant_producto}
                        onChange={(e) => setDetalle({ ...detalle, cant_producto: e.target.value })}
                    ></input>
                </div>
                <div class="flex flex-col m-4 w-full justify-center items-center">
                    <label class="font-semibold">Descripcion</label>
                    <input class="border border-navy w-1/2"
                        type="text"
                        name="descripcion"
                        id="descripcion"
                        value={detalle.descripcion}
                        onChange={(e) => setDetalle({ ...detalle, descripcion: e.target.value })}
                    ></input>
                </div>
                <button onClick={enviarDatosDetalle} class="bg-navy text-white font-semibold p-3 pl-4 pr-4 mb-8 rounded-xl">Agregar</button>
            </form>
            <div>
                <table class="table-auto border-collapse border border-grotto self-center w-full">
                    <thead>
                        <tr class="border-none bg-royal text-white">
                            <th class="p-2 py-4 border border-mid tracking-wider text-center">Producto</th>
                            <th class="p-2 py-4 border border-mid tracking-wider text-center">Cantidad</th>
                            <th class="p-2 py-4 border border-mid tracking-wider text-center">Descripcion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>



        </section>
    )
}
/*const enviarDatosDetalle = async (e) => {
        e.preventDefault();
        try {
            console.log("datos a enviar:")
            console.log(detalle)
            const response = await fetch("https://AfigoControl.somee.com/API/api/detalle/create", {
                method: 'POST',
                body: JSON.stringify(detalle),
                headers: {
                    'Content-Type': "application/json; charset=utf-8",
                    "Authorization": sessionStorage.getItem('Token')
                }
            });

            if (response.ok) {
                const data = await response.json();
                // Hacer algo con la respuesta de la API si es necesario
                console.log(data);
            } else {
                // Manejar errores de la API
                console.error("Error al enviar los datos del pedido a la API");
            }
        } catch (error) {
            console.error("Error en la solicitud POST:", error);
        }
    };*/

/*

 

                     

                    */