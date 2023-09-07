
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


export function EditarD({ item, id_pedido, IdDetalle }) {
    const ID = id_pedido;
    const DetalleId = IdDetalle;

    const [editedItem, setEditedItem] = useState(item);

    const onChange = (e) => {
        setEditedItem({
            ...editedItem,
            [e.target.name]: e.target.value
        });
    };

    const submitFormEdit = async (e) => {
        e.preventDefault();

        
        try {
            const params = {
                id_detalle: DetalleId,
                id_pedido:ID,
                nombre_producto: e.target.nombre_producto.value,
                cant_producto: parseInt(e.target.cant_producto.value),
                descripcion: e.target.descripcion.value
            };
            console.log(params);

            const response = await fetch("https://AfigoControl.somee.com/API/api/detalle/update", {
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
            const { id_detalle, id_pedido, nombre_producto, cant_producto, descripcion } = editedItem;
            setEditedItem({ id_detalle, id_pedido, nombre_producto, cant_producto, descripcion });
        }
    }, [editedItem]);

    return (
        <section class="fixed top-40 left-1 w-full h-full flex flex-col items-center">
            <ToastContainer />
            <div class="min-w-[35%] bg-white p-1  flex flex-col shadow-[4px_10px_60px_800px_rgba(0,0,0,0.3)] rounded-xl" >
                <form onSubmit={submitFormEdit} class="grid">
                    <input class="border border-navy w-1/2 text-[1.05rem] p-1 rounded-md"
                        type="text"
                        name="id_detalle"
                        id="id_detalle"
                        onChange={onChange}
                        value={editedItem.id_detalle === null ? "" : editedItem.id_detalle}
                        style={{ display: 'none' }}
                    />
                    <input class="border border-navy w-1/2 text-[1.05rem] p-1 rounded-md"
                        type="text"
                        name="id_pedido"
                        id="id_pedido"
                        onChange={onChange}
                        value={editedItem.id_pedido === null ? "" : editedItem.id_pedido}
                        style={{ display: 'none' }}
                    />
                    <div class="flex flex-col m-4 w-full justify-center items-center justify-self-center">
                        <label class="font-semibold">Nombre del producto</label>
                        <input class="border border-navy w-1/2"
                            name="nombre_producto"
                            id="nombre_producto"
                            value={editedItem.nombre_producto === null ? "" : editedItem.nombre_producto}
                            onChange={onChange}></input>
                    </div>

                    <div class="flex flex-col m-4 w-full justify-center items-center justify-self-center">
                        <label class="font-semibold">Cantidad</label>
                        <input class="border border-navy w-1/2"
                            name="cant_producto"
                            id="cant_producto"
                            value={editedItem.cant_producto === null ? "" : editedItem.cant_producto}
                            onChange={onChange}></input>
                    </div>

                    <div class="flex flex-col m-4 w-full justify-center items-center justify-self-center">
                        <label class="font-semibold">Descripcion</label>
                        <input class="border border-navy w-1/2"
                            name="descripcion"
                            id="descripcion"
                            value={editedItem.descripcion === null ? "" : editedItem.descripcion}
                            onChange={onChange}></input>
                    </div>

                    <div class="flex flex-col m-4 w-full justify-center items-center justify-self-center">
                        <button type='submit' class="bg-navy text-white font-semibold p-3 pl-4 pr-4 mb-4 rounded-xl min-w-1/5 ">Enviar</button>
                    </div>
                    
                </form>

            </div>
        </section>

    );
}
