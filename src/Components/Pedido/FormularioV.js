import { IoChevronBackCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Nav } from "reactstrap";
import {  useEffect } from 'react';
import { FormularioD } from "../Detalle/FormularioD";
import React, { useState } from "react";

export function FormularioV() {
    //api/pedido/create
    //api/detalle/create
    //api/detalle/byPedido
     
    const ID = sessionStorage.getItem('id_usuario')
    console.log("*ID *")
    console.log( ID )
    const navigate = useNavigate()
    const pedidos = [];
    const [pedidoId, setPedidoId] = useState(null);
    const [showDiv, setShowDiv] = useState(false);
        const [showDiv1, setShowDiv1] = useState(true);

    const toggleDiv = () => {
        setShowDiv(!showDiv);
    };

      const toggleDiv1 = () => {
        setShowDiv1(!showDiv1);
    };


    const [pedido, setPedido] = useState([{
        estado: "",
        id_usuario: ID,
        nombre_cliente: "",
        factura_electronica: 0,
        detalle_factura: "",
        metodo_envio: "",
        direccion_envio: "",
        urgencia: "",
        tipo_pedido: ""
    }]);

    const enviarDatosPedido = async () => {
        try {
            const params = {
                estado: "Pendiente",
                id_usuario: parseInt(ID),
                nombre_cliente: pedido.nombre_cliente,
                factura_electronica: parseInt(pedido.factura_electronica),
                detalle_factura: pedido.detalle_factura,
                metodo_envio: pedido.metodo_envio,
                direccion_envio: pedido.direccion_envio,
                urgencia: pedido.urgencia,
                tipo_pedido: "Pedido"
            };
            const response = await fetch("https://AfigoControl.somee.com/API/api/pedido/create", {
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
                const idPedido = data.pedido.id_pedido;
                // Almacena el valor en el estado
                setPedidoId(idPedido);
                console.log("ID ID ID:", pedidoId)
                toggleDiv();
                toggleDiv1() 
                console.log(data);

            } else {
                // Manejar errores de la API
                console.error("Error al enviar los datos del pedido a la API");
            }
        } catch (error) {
            console.error("Error en la solicitud POST:", error);
        }
    };

    return (

        <><Nav />
            <section class="flex flex-col w-full justify-center items-center">
                <div class="self-start ml-20 mt-10">
                    <button onClick={() => navigate('/Inicio')}><IoChevronBackCircleSharp class="w-10 h-10 fill-navy" /></button>

                </div>
                <div class="pt-8 ">
                    <h1 class="text-4xl font-bold text-royal">Formulario de ventas</h1>
                </div>
                <div class="flex flex-col w-1/2 justify-center items-center pt-20">

                    <div class="flex flex-col m-4 w-full justify-center items-center">
                        <label class="font-semibold">Nombre del cliente</label>
                        <input class="border border-navy w-1/2"
                            value={pedido.nombre_cliente}
                            onChange={(e) => setPedido({ ...pedido, nombre_cliente: e.target.value })}></input>
                    </div>

                    <div class="flex flex-col m-4 w-full justify-center items-center">
                        <label class="font-semibold">Tipo de factura</label>
                        <select class="border border-navy w-1/2"
                            value={pedido.factura_electronica}
                            onChange={(e) => setPedido({ ...pedido, factura_electronica: e.target.value })}>
                            <option value={2}></option>
                            <option value={0}>Factura electronica</option>
                            <option value={1}>Factura fisica</option>
                        </select>
                    </div>

                    <div class="flex flex-col m-4 w-full justify-center items-center">
                        <label class="font-semibold">Informacion para factura</label>
                        <input class="border border-navy w-1/2"
                            value={pedido.detalle_factura}
                            onChange={(e) => setPedido({ ...pedido, detalle_factura: e.target.value })}></input>
                    </div>

                    <div class="flex flex-col m-4 w-full justify-center items-center">
                        <label class="font-semibold">Metodo de envio</label>
                        <select class="border border-navy w-1/2"
                            value={pedido.metodo_envio}
                            onChange={(e) => setPedido({ ...pedido, metodo_envio: e.target.value })}>
                            <option value=""></option>
                            <option value="Express">Express</option>
                            <option value="Encomienda">Encomienda</option>
                        </select>
                    </div>


                    <div class="flex flex-col m-4 w-full justify-center items-center">
                        <label class="font-semibold">Direccion</label>
                        <input class="border border-navy w-1/2"
                            value={pedido.direccion_envio}
                            onChange={(e) => setPedido({ ...pedido, direccion_envio: e.target.value })}></input>
                    </div>


                    <div class="flex flex-col m-4 w-full justify-center items-center">
                        <label class="font-semibold">Urgencia</label>
                        <select class="border border-navy w-1/2" value={pedido.urgencia}
                            onChange={(e) => setPedido({ ...pedido, urgencia: e.target.value })}>
                            <option value=""></option>
                            <option value="Leve">Leve</option>
                            <option value="Moderado">Moderado</option>
                            <option value="Urgente">Urgente</option>
                        </select>
                    </div>

                   {showDiv1 &&  <button onClick={enviarDatosPedido} class="bg-navy text-white font-semibold p-3 pl-4 pr-4 mb-4 rounded-xl">Enviar</button>}
                </div>
            </section>
            {showDiv && <><FormularioD idPedido={pedidoId} /><div class="flex flex-col items-center justify-center mt-2 mb-4">
                <button class="bg-navy text-white font-semibold p-3 pl-4 pr-4 mb-4 rounded-xl" onClick={() => navigate('/Inicio')}>Listo</button>
            </div></>}

            
        </>

    )
}
/**/

