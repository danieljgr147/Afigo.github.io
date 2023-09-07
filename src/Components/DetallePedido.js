
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export function DetallePedido({ buttonLabel, item, updateState, IdPedido }){
    console.log("aqui id")
    console.log(IdPedido)
    return(
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
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}