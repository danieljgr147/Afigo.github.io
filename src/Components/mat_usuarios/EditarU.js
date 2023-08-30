import { Create, Update } from '../../API/usuarios'
import { useState, useEffect } from 'react';

export function EditarU(props) {
    const [usuario, setUsuario] = useState({
        user_id: 0,
        nombre: "",
        direccion: "",
        usuario_admin: 0,
        nombre_de_usuario: "",
        contrasenia: ""
    });

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    };

    const submitFormAdd = async (e) => {
        e.preventDefault();
        const params = {
            direccion: e.target.direccion.value,
            nombre: e.target.nombre.value,
            usuario_admin: parseInt(e.target.usuario_admin.value),
            nombre_de_usuario: e.target.nombre_de_usuario.value,
            contrasenia: e.target.contrasenia.value
        };

        await Create(params)
        props.addItemToState();
        props.toggle()


    };

    const submitFormEdit = async (e) => {
        e.preventDefault();
        const params = {
            user_id: parseInt(e.target.user_id.value),
            direccion: e.target.direccion.value,
            nombre: e.target.nombre.value,
            usuario_admin: parseInt(e.target.usuario_admin.value),
            nombre_de_usuario: e.target.nombre_de_usuario.value,
            contrasenia: e.target.contrasenia.value
        };

        await Update(params)
        props.updateState()
        props.toggle()

    };

    useEffect(() => {
        if (props.item) {
            const { user_id, nombre, direccion, usuario_admin, nombre_de_usuario, contrasenia } = props.item;
            setUsuario({ user_id, nombre, direccion, usuario_admin, nombre_de_usuario, contrasenia });
        }
    }, [props.item]);

    return (
        <section class="fixed top-40 left-1 w-full h-full flex flex-col items-center">
            <div class="min-w-[35%] bg-white p-1  flex flex-col shadow-[4px_10px_60px_800px_rgba(0,0,0,0.3)] rounded-xl" >
                <form onSubmit={props.item ? submitFormEdit : submitFormAdd} class="grid">
                    <input class="border border-navy w-1/2 text-[1.05rem] p-1 rounded-md"
                        type="text"
                        name="Id user_id"
                        id="user_id"
                        onChange={onChange}
                        value={usuario.user_id === null ? "" : usuario.user_id}
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
                            value={usuario.nombre === null ? "" : usuario.nombre}
                        />
                    </div>
                    <div class="flex flex-col items-center  m-1">
                        <label class="font-semibold text-xl" for="direccion">Direccion</label>
                        <input class="border border-navy w-8/12 text-[1.05rem] p-1 rounded-md shadow-xl"
                            type="text"
                            name="direccion"
                            id="direccion"
                            onChange={onChange}
                            value={usuario.direccion === null ? "" : usuario.direccion}
                        />
                    </div>
                    <div class="flex flex-col items-center  m-1">
                        <label class="font-semibold text-xl" for="usuario_admin">Usuario administrador</label>
                        <select class="border border-navy w-8/12 text-[1.05rem] p-1 rounded-md shadow-xl"
                            name="usuario_admin"
                            id="usuario_admin"
                            onChange={onChange}
                            value={usuario.usuario_admin === null ? "" : usuario.usuario_admin}
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
                            value={usuario.nombre_de_usuario === null ? "" : usuario.nombre_de_usuario}
                        />
                    </div>
                    <div class="flex flex-col items-center  m-1 mb-6">
                        <label class="font-semibold text-xl" for="contrasenia">Contraseña</label>
                        <input class="border border-navy w-8/12 text-[1.05rem] p-1 rounded-md shadow-xl"
                            type="text"
                            name="contrasenia"
                            id="contrasenia"
                            onChange={onChange}
                            value={usuario.contrasenia === null ? "" : usuario.contrasenia}
                        />
                        <button class="bg-navy text-white font-semibold mt-4 p-1 w-2/5 rounded-xl">Agregar</button>
                    </div>
                    
                </form>
            </div>
        </section>

    );
}