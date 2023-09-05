import { IoChevronBackCircleSharp} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Nav } from "reactstrap";

export function FormularioV() {
    //api/pedido/create
    //api/detalle/create
    //api/detalle/byPedido
    const navigate = useNavigate()
    const [pedido, setPedido] = useState([{
        estado: "",
        id_usuario: 1,
        nombre_cliente: "",
        factura_electronica: 0,
        detalle_factura:"",
        metodo_envio: "",
        direccion_envio: "",
        urgencia: "",
        tipo_pedido: "1"
    }]);
 
    const [detalle, setDetalle] = useState([{
        id_pedido: 0,
        nombre_producto: "",
        cant_producto: 0,
        descripcion: ""
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
                            <option value="0">Factura electronica</option>
                            <option value="1">Factura fisica</option>
                        </select>
                    </div>

                    <div class="flex flex-col m-4 w-full justify-center items-center">
                        <label class="font-semibold">Metodo de envio</label>
                        <select class="border border-navy w-1/2"
                        value={pedido.metodo_envio}
                        onChange={(e) => setPedido({ ...pedido, metodo_envio: e.target.value })}>
                            <option value="0">Express</option>
                            <option value="1">Encomienda</option>
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
                            <option value="0">Leve</option>
                            <option value="1">Moderado</option>
                            <option value="2">Urgente</option>
                        </select>
                    </div>

                    <button onClick={enviarDatosPedido} class="bg-navy text-white font-semibold p-3 pl-4 pr-4 mb-4 rounded-xl">Enviar</button>
                </div>
            </section>

            <section class="flex flex-col w-full justify-center items-center">
                <form class="flex flex-col w-1/2 justify-center items-center pt-10">
                    <div class="pt-8 text-center">
                        <h1 class="text-4xl font-bold text-royal pb-2">Agregar productos</h1>
                    </div>
                    <div class="flex flex-col m-4 w-full justify-center items-center">
                        <label class="font-semibold">Producto</label>
                        <input class="border border-navy w-1/2"
                        value={detalle.nombre_producto}
                        onChange={(e) => setDetalle({ ...detalle, nombre_producto: e.target.value })}></input>
                    </div>
                    <div class="flex flex-col m-4 w-full justify-center items-center">
                        <label class="font-semibold">Cantidad</label>
                        <input class="border border-navy w-1/2"
                        value={detalle.cant_producto}
                        onChange={(e) => setDetalle({ ...detalle, cant_producto: e.target.value })}></input>
                    </div>
                    <div class="flex flex-col m-4 w-full justify-center items-center">
                        <label class="font-semibold">Descripcion</label>
                        <input class="border border-navy w-1/2"
                        value={detalle.descripcion}
                        onChange={(e) => setDetalle({ ...detalle, descripcion: e.target.value })}></input>
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

                        </tbody>
                    </table>
                </div>


                <button class="bg-navy text-white font-semibold p-3 pl-4 pr-4 mb-8 rounded-xl">Enviar</button>
        </section>
        </>

    )
} 