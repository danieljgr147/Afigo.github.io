import { Nav } from "./Nav"
import { Sidebar } from "./Sidebar"
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate=useNavigate()

    return (
        
            <section class="flex flex-row w-full">
                <div>
                    <Sidebar class="w-3/12"/>
                </div>
                <section class="flex flex-col w-9/12">
                    <div class="m-5 p-5 ">
                        <button class="bg-grotto p-5 rounded-full font-bold border-none shadow-md text-royal drop-shadow-2xl" onClick={() => navigate('/Ventas')} >Nuevo Pedido</button>
                    </div>

                    <div class="flex content-center items-center overflow-x-auto overflow-y-auto  shadow-xl sm:rounded-t-xl ml-4">

                        <table class="table-auto border-collapse border border-grotto self-center w-full">

                            <thead >
                                <tr class="border-none bg-royal text-white">
                                    <th class="p-2 py-4 border border-mid tracking-wider">Vendendor</th>
                                    <th class="p-2 py-4 border border-mid tracking-wider">Cliente</th> 
                                    <th class="p-2 py-4 border border-mid tracking-wider">Factura</th>
                                    <th class="p-2 py-4 border border-mid tracking-wider">Producto</th>
                                    <th class="p-2 py-4 border border-mid tracking-wider">Cantidad</th>
                                    <th class="p-2 py-4 border border-mid tracking-wider">Envio</th>
                                    <th class="p-2 py-4 border border-mid tracking-wider">Direccion</th>
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
            </section>

        
    )
}