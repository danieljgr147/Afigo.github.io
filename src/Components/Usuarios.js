import { Nav } from "./Nav"
import { Sidebar } from "./Sidebar"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Get_Info } from '../API/service'

export function Usuarios() {
    const navigate = useNavigate()

    const [items, setItems] = useState([])

    useEffect(() => {
        const parametros = {
            spr: "spUserAll"
        }
        Get_Info(parametros)
            .then(async res => await res)
            .then(
                (result) => {
                    setItems(result);
                },
                (error) => {
                    console.log(error);
                }
            )

    }, []);

    return (
        <><Nav /><section class="flex flex-row w-full">
            <div>
                <Sidebar class="w-3/12" />
            </div>
            <section class="alex flex-col w-9/12">
                <div class="m-5 p-5 ">
                    <button class="bg-grotto p-5 rounded-full font-bold border-none shadow-md text-royal drop-shadow-2xl" onClick={() => navigate('/formularioUsuario')}>Nuevo Usuario</button>
                </div>
                <div class="flex content-center items-center overflow-x-auto overflow-y-auto  shadow-xl sm:rounded-t-xl ml-4">

                    <table class="table-auto border-collapse border border-grotto self-center w-full">

                        <thead>
                            <tr class="border-none bg-royal text-white">
                                <th class="p-2 py-4 border border-mid tracking-wider">Nombre</th>
                                <th class="p-2 py-4 border border-mid tracking-wider">Direccion</th>
                                <th class="p-2 py-4 border border-mid tracking-wider">Usuario</th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map(item => (
                                <>
                                    <tr class="even:bg-grotto odd:bg-baby" key={item.user_id}>
                                        <th class="p-2 py-4 border-b border-mid tracking-wider">{item.nombre} </th>
                                        <th class="p-2 py-4 border-b border-mid tracking-wider">{item.direccion} </th>
                                        <th class="p-2 py-4 border-b border-mid tracking-wider">{item.nombre_de_usuario} </th>
                                    </tr>
                                </>
                            ))}
                        </tbody>

                    </table>
                </div>
            </section>
        </section></>


    )
}