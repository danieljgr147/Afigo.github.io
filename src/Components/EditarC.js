import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


export function EditarC({ buttonLabel, item, updateState, pedidoId }) {
    const ID = pedidoId;

    const [editedItem, setEditedItem] = useState(item);

    const onChange = (e) => {
        setEditedItem({
            ...editedItem,
            [e.target.name]: e.target.value
        });
    };

    const submitFormEdit = async (e) => {
        e.preventDefault();
        console.log(ID);
        try {
            const params = {
                id_pedido: ID,
                estado: e.target.estado.value,
                id_usuario: 1,
                nombre_cliente: e.target.nombre_cliente.value,
                factura_electronica: 0,
                detalle_factura: e.target.detalle_factura.value,
                metodo_envio: "",
                direccion_envio: "",
                urgencia: "",
                tipo_pedido: "Cotizacion"
            };
            console.log(params);

            const response = await fetch("https://AfigoControl.somee.com/API/api/pedido/update", {
                method: 'PUT',
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
                toast.success('Usuario actualizado con éxito', {
                    position: 'top-right',
                    autoClose: 3000, // Duración en milisegundos
                    hideProgressBar: false,
                });
            } else {
                // Manejar errores de la API
                console.error("Error al enviar los datos del pedido a la API");
            }
        } catch (error) {
            console.error("Error en la solicitud POST:", error);
        }



    };

    useEffect(() => {
        if (editedItem) {
            const { estado, id_usuario, nombre_cliente, factura_electronica, detalle_factura, metodo_envio, direccion_envio, urgencia, tipo_pedido } = editedItem;
            setEditedItem({ estado, id_usuario, nombre_cliente, factura_electronica, detalle_factura, metodo_envio, direccion_envio, urgencia, tipo_pedido });
        }
    }, [editedItem]);

    return (
        <section class="fixed top-40 left-1 w-full h-full flex flex-col items-center">
            <ToastContainer />
            <div class="min-w-[35%] bg-white p-1  flex flex-col shadow-[4px_10px_60px_800px_rgba(0,0,0,0.3)] rounded-xl" >
                <form onSubmit={submitFormEdit} class="grid">
                    <input class="border border-navy w-1/2 text-[1.05rem] p-1 rounded-md"
                        type="text"
                        name="id_usuario"
                        id="id_usuario"
                        onChange={onChange}
                        value={editedItem.id_usuario === null ? "" : editedItem.id_usuario}
                        style={{ display: 'none' }}
                    />
                    <input class="border border-navy w-1/2 text-[1.05rem] p-1 rounded-md"
                        type="text"
                        name="tipo_pedido"
                        id="tipo_pedido"
                        onChange={onChange}
                        value={editedItem.tipo_pedido === null ? "" : editedItem.tipo_pedido}
                        style={{ display: 'none' }}
                    />
                    <div class="flex flex-col m-4 w-full justify-center items-center">
                        <label class="font-semibold">Nombre del cliente</label>
                        <input class="border border-navy w-1/2"
                            name="nombre_cliente"
                            id="nombre_cliente"
                            value={editedItem.nombre_cliente === null ? "" : editedItem.nombre_cliente}
                            onChange={onChange}></input>
                    </div>


                    <select class="border border-navy w-1/2"
                        name="factura_electronica"
                        id="factura_electronica"
                        value={editedItem.factura_electronica === null ? "" : editedItem.factura_electronica}
                        onChange={onChange}
                        style={{ display: 'none' }}>

                        <option value={1}></option>
                        <option value={0}>Factura electronica</option>
                        <option value={1}>Factura fisica</option>
                    </select>


                    <div class="flex flex-col m-4 w-full justify-center items-center">
                        <label class="font-semibold">Informacion de Cliente</label>
                        <input class="border border-navy w-1/2"
                            name="detalle_factura"
                            id="detalle_factura"
                            value={editedItem.detalle_factura === null ? "" : editedItem.detalle_factura}
                            onChange={onChange}></input>
                    </div>

                    <select class="border border-navy w-1/2"
                        name="metodo_envio"
                        id="metodo_envio"
                        value={editedItem.metodo_envio === null ? "" : editedItem.metodo_envio}
                        onChange={onChange}
                        style={{ display: 'none' }}>
                        <option value=""></option>
                        <option value="Express">Express</option>
                        <option value="Encomienda">Encomienda</option>
                    </select>

                    <input class="border border-navy w-1/2"
                        name="direccion_envio"
                        id="direccion_envio"
                        value={editedItem.direccion_envio === null ? "" : editedItem.direccion_envio}
                        onChange={onChange}
                        style={{ display: 'none' }}></input>


                    <div class="flex flex-col m-4 w-full justify-center items-center">
                        <label class="font-semibold">Estado</label>
                        <select class="border border-navy w-1/2"
                            name="estado"
                            id="estado"
                            value={editedItem.estado === null ? "" : editedItem.estado}
                            onChange={onChange}>
                            <option value=""></option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Listo">Listo</option>
                        </select>
                    </div>

                    <select class="border border-navy w-1/2"
                        name="urgencia"
                        id="urgencia"
                        value={editedItem.urgencia === null ? "" : editedItem.urgencia}
                        onChange={onChange}
                        style={{ display: 'none' }}>
                        <option value=""></option>
                        <option value="Leve">Leve</option>
                        <option value="Moderado">Moderado</option>
                        <option value="Urgente">Urgente</option>
                    </select>

                    <div class="flex flex-col m-4 w-full justify-center items-center">
                        <button type='submit' class="bg-navy text-white font-semibold p-3 pl-4 pr-4 mb-4 rounded-xl w-1/5">Enviar</button>
                    </div>
                    
                </form>

            </div>
        </section>

    );
}
