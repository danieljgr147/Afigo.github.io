import { IoChevronBackCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Nav } from "reactstrap";
import { useState, useEffect } from 'react';
import { FormularioD } from "../Detalle/FormularioD";

export function FormularioC() {
    const navigate = useNavigate()
    const [pedidoId, setPedidoId] = useState(null);
    const [showDiv, setShowDiv] = useState(false);

    const toggleDiv = () => {
        setShowDiv(!showDiv);
    };

    const [pedido, setPedido] = useState([{
        estado: "",
        id_usuario: 1,
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
                id_usuario: 1,
                nombre_cliente: pedido.nombre_cliente,
                factura_electronica: 0,
                detalle_factura: pedido.detalle_factura,
                metodo_envio: "",
                direccion_envio: "",
                urgencia: "",
                tipo_pedido: "Cotizacion"
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
            } else {
                // Manejar errores de la API
                console.error("Error al enviar los datos del pedido a la API");
            }
        } catch (error) {
            console.error("Error en la solicitud POST:", error);
        }
    };


    return (
        <><Nav /><section class="flex flex-col w-full justify-center items-center">
            <div class="self-start ml-20 mt-10">
                <button onClick={() => navigate('/Cotizacion')}><IoChevronBackCircleSharp class="w-10 h-10 fill-navy" /></button>
            </div>
            <div class="pt-8 flex justify-center text-center">
                <h1 class="text-4xl font-bold text-royal">Formulario de cotizaciones</h1>
            </div>
            <div class="flex flex-col w-1/2 justify-center items-center pt-20">

                <div class="flex flex-col m-4 w-full justify-center items-center">
                    <label class="font-semibold">Nombre del cliente</label>
                    <input class="border border-navy w-1/2"
                        value={pedido.nombre_cliente}
                        onChange={(e) => setPedido({ ...pedido, nombre_cliente: e.target.value })}></input>
                </div>


                <div class="flex flex-col m-4 w-full justify-center items-center">
                    <label class="font-semibold">Informacion del cliente</label>
                    <input class="border border-navy w-1/2"
                        value={pedido.detalle_factura}
                        onChange={(e) => setPedido({ ...pedido, detalle_factura: e.target.value })}></input>
                </div>

                <button onClick={enviarDatosPedido} class="bg-navy text-white font-semibold p-3 pl-4 pr-4 mb-4 rounded-xl">Enviar</button>
            </div>
        </section>
            {showDiv && <FormularioD idPedido={pedidoId} />}

            <div class="flex flex-col items-center justify-center mt-2 mb-4">
                <button class="bg-navy text-white font-semibold p-3 pl-4 pr-4 mb-4 rounded-xl" onClick={() => navigate('/Inicio')}>Listo</button>
            </div>
        </>
    )
}