import { IoChevronBackCircleSharp} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Nav } from "reactstrap";

export function FormularioC() {
    const navigate = useNavigate()

    const [pedido, setPedido] = useState([{
        estado: "",
        id_usuario: 1,
        nombre_cliente: "",
        factura_electronica: 0,
        detalle_factura: "",
        metodo_envio: "",
        direccion_envio: "",
        urgencia: "",
        tipo_pedido: "1"
    }]);

    const enviarDatosPedido = async () => {
        try {
            const response = await fetch("https://AfigoControl.somee.com/API/api/pedido/create", {
                method: 'POST',
                body: JSON.stringify(pedido),
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
    };

    const [detalle, setDetalle] = useState([{
        id_pedido: 1,
        nombre_producto: "",
        cant_producto: 0,
        descripcion: ""
    }]);
 
    const enviarDatosDetalle = async () => {
        try {
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
                console.error("Error al enviar los datos del detalle a la API");
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
                    <input class="border border-navy w-1/2"></input>
                </div>

                <div class="flex flex-col m-4 w-full justify-center items-center">
                    <label class="font-semibold">Producto y cantidad</label>
                    <input class="border border-navy w-1/2"></input>
                </div>


                <div class="flex flex-col m-4 w-full justify-center items-center">
                    <label class="font-semibold">Descripcion del producto</label>
                    <input class="border border-navy w-1/2"></input>
                </div>

                <div class="flex flex-col m-4 w-full justify-center items-center">
                    <label class="font-semibold">Contacto del cliente</label>
                    <input class="border border-navy w-1/2"></input>
                </div>

                <button class="bg-navy text-white font-semibold p-3 pl-4 pr-4 mb-8 rounded-xl">Enviar</button>

            </div>
        </section></>
    )
}