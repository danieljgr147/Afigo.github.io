import { Nav } from "./Nav"
import { Sidebar } from "./Sidebar"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

export function Cotizacion() {
    const navigate=useNavigate()
    const [cotizacion, setCotizacion] = useState([]);
    useEffect(() => {
        // Función para hacer la solicitud GET a la API
        const fetchCotizacion = async () => {
          try {
            const response = await fetch("https://AfigoControl.somee.com/API/api/pedido/All", {
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
  const tableRows = cotizacion.map((item) => (
    <tr key={item.fecha}>
      <td>{item.id_usuario}</td>
      <td>{item.nombre_cliente}</td>
      <td>{item.detalle_factura}</td>
      <td>{item.estado}</td>
    </tr>
  ));

    return (
        <><Nav /><section class="flex flex-row w-full">
            <div>
                <Sidebar class="w-3/12" />
            </div>
            <section class="alex flex-col w-9/12 ml-14">
                <div class="m-5 p-5 ">
                    <button class="bg-grotto p-5 rounded-full font-bold border-none shadow-md text-royal drop-shadow-2xl" onClick={() => navigate('/formularioCotizacion')}>Nueva Cotizacion</button>
                </div>
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
                            <tr class="even:bg-grotto odd:bg-baby">
                                <th class="p-2 py-4 border-b border-mid tracking-wider"> </th>
                                <th class="p-2 py-4 border-b border-mid tracking-wider"> </th>
                                <th class="p-2 py-4 border-b border-mid tracking-wider"> </th>
                                <th class="p-2 py-4 border-b border-mid tracking-wider"> </th>
                                <th class="p-2 py-4 border-b border-mid tracking-wider"> </th>
                                <th class="p-2 py-4 border-b border-mid tracking-wider"> </th>
                                <th class="p-2 py-4 border-b border-mid tracking-wider"> </th>
                            </tr>
                            <tr class="even:bg-grotto odd:bg-baby">
                                <th class="p-2 py-4 border-b border-mid tracking-wider"> </th>
                                <th class="p-2 py-4 border-b border-mid tracking-wider"> </th>
                                <th class="p-2 py-4 border-b border-mid tracking-wider"> </th>
                                <th class="p-2 py-4 border-b border-mid tracking-wider"> </th>
                                <th class="p-2 py-4 border-b border-mid tracking-wider"> </th>
                                <th class="p-2 py-4 border-b border-mid tracking-wider"> </th>
                                <th class="p-2 py-4 border-b border-mid tracking-wider"> </th>
                            </tr>
                            <tr class="even:bg-grotto odd:bg-baby">
                                <th class="p-2 py-4 border-b border-mid tracking-wider"> </th>
                                <th class="p-2 py-4 border-b border-mid tracking-wider"> </th>
                                <th class="p-2 py-4 border-b border-mid tracking-wider"> </th>
                                <th class="p-2 py-4 border-b border-mid tracking-wider"> </th>
                                <th class="p-2 py-4 border-b border-mid tracking-wider"> </th>
                                <th class="p-2 py-4 border-b border-mid tracking-wider"> </th>
                                <th class="p-2 py-4 border-b border-mid tracking-wider"> </th>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </section>
        </section></>

        
    )
}