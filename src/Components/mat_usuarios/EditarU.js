import { Create, Update } from '../../API/usuarios'
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export function EditarU({ buttonLabel, item, updateState, contra, itemId }) {

    const [editedItem, setEditedItem] = useState(item);

    const onChange = (e) => {
        setEditedItem({
            ...editedItem,
            [e.target.name]: e.target.value
        });
    };

    const submitFormEdit = async (e) => {
        e.preventDefault();
        const params = {
            user_id: parseInt(e.target.user_id.value),
            direccion: e.target.direccion.value,
            nombre: e.target.nombre.value,
            usuario_admin: parseInt(e.target.usuario_admin.value),
            nombre_de_usuario: e.target.nombre_de_usuario.value,
            contrasenia: e.target.contrasenia.value,
            sucursal: e.target.sucursal.value
        };

        await Update(params)
        console.log(params)
        updateState(params)
        toast.success('Usuario actualizado con éxito', {
            position: 'top-right',
            autoClose: 3000, // Duración en milisegundos
            hideProgressBar: false,
        });

    };

    useEffect(() => {
        if (editedItem) {
            const { user_id, nombre, direccion, usuario_admin, nombre_de_usuario, contrasenia, sucursal } = editedItem;
            setEditedItem({ user_id, nombre, direccion, usuario_admin, nombre_de_usuario, contrasenia, sucursal });
        }
    }, [editedItem]);

    return (
        <section class="fixed top-40 left-1 w-full h-full flex flex-col items-center">
            <ToastContainer />
            <div class="min-w-[35%] bg-white p-1  flex flex-col shadow-[4px_10px_60px_800px_rgba(0,0,0,0.3)] rounded-xl" >
                <form onSubmit={submitFormEdit} class="grid">
                    <input class="border border-navy w-1/2 text-[1.05rem] p-1 rounded-md"
                        type="text"
                        name="Id user_id"
                        id="user_id"
                        onChange={onChange}
                        value={editedItem.user_id === null ? "" : editedItem.user_id}
                        style={{ display: 'none' }}
                    />
                    <div class="flex flex-col items-center m-1 pb-5 pt-3">
                        <h1 class="font-semibold text-2xl">Editar Usuario</h1>
                    </div>
                    <div class="flex flex-col items-center m-1">
                        <label class="font-semibold text-xl" for="nombre">Nombre</label>
                        <input class="border border-navy w-8/12 text-[1.05rem] p-1 rounded-md shadow-xl"
                            type="text"
                            name="nombre"
                            id="nombre"
                            onChange={onChange}
                            value={editedItem.nombre === null ? "" : editedItem.nombre}
                        />
                    </div>
                    <div class="flex flex-col items-center  m-1">
                        <label class="font-semibold text-xl" for="direccion">Direccion</label>
                        <input class="border border-navy w-8/12 text-[1.05rem] p-1 rounded-md shadow-xl"
                            type="text"
                            name="direccion"
                            id="direccion"
                            onChange={onChange}
                            value={editedItem.direccion === null ? "" : editedItem.direccion}
                        />
                    </div>
                    <div class="flex flex-col items-center  m-1">
                        <label class="font-semibold text-xl" for="usuario_admin">Usuario administrador</label>
                        <select class="border border-navy w-8/12 text-[1.05rem] p-1 rounded-md shadow-xl"
                            name="usuario_admin"
                            id="usuario_admin"
                            onChange={onChange}
                            value={editedItem.usuario_admin === null ? "" : editedItem.usuario_admin}
                        >
                            <option class="border border-navy w-1/2" value="0">No</option>
                            <option class="border border-navy w-1/2" value="1">Si</option></select>
                    </div>
                    <div class="flex flex-col items-center  m-1">
                        <label class="font-semibold text-xl" for="nombre_de_usuario">Nombre de usuario</label>
                        <input class="border border-navy w-8/12 text-[1.05rem] p-1 rounded-md shadow-xl"
                            type="text"
                            name="nombre_de_usuario"
                            id="nombre_de_usuario"
                            onChange={onChange}
                            value={editedItem.nombre_de_usuario === null ? "" : editedItem.nombre_de_usuario}
                        />
                    </div>
                    <div class="flex flex-col items-center  m-1 mb-6">
                        <label class="font-semibold text-xl" for="contrasenia">Contraseña</label>
                        <input class="border border-navy w-8/12 text-[1.05rem] p-1 rounded-md shadow-xl"
                            type="text"
                            name="contrasenia"
                            id="contrasenia"
                            onChange={onChange}
                            value={editedItem.contrasenia === null ? "" : editedItem.contrasenia}
                        />
                    </div>

                    <div class="flex flex-col items-center  m-1">
                        <label class="font-semibold text-xl" for="sucursal">Sucursal</label>
                        <select class="border border-navy w-8/12 text-[1.05rem] p-1 rounded-md shadow-xl"
                            name="sucursal"
                            id="sucursal"
                            onChange={onChange}
                            value={editedItem.sucursal === null ? "" : editedItem.sucursal}
                        >
                            <option class="border border-navy w-1/2" value=" ">  </option>
                            <option class="border border-navy w-1/2" value="Palmares">Palmares</option>
                            <option class="border border-navy w-1/2" value="Sarchí">Sarchí</option>
                            <option class="border border-navy w-1/2" value="Nicoya">Nicoya</option>
                            <option class="border border-navy w-1/2" value="Cóbano">Cóbano</option>
                        </select>
                        <button type='submit' class="bg-navy text-white font-semibold mt-4 p-1 w-2/5 rounded-xl">Agregar</button>
                    </div>

                </form>
            </div>
        </section>

    );
}