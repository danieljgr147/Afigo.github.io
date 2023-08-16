import { IoChevronBackCircleSharp} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {Send_Info} from '../API/service'
import { Form } from 'reactstrap';

export function FormularioU(){
    const Registar_Usuario = async (event) => {
        event.preventDefault();

        const params = {
            spr: "spUserNew",
            pr: [{
                parametroNombre: "nombre",
                parametroResult: event.target.nombre.value
            },
            {
                parametroNombre: "direccion",
                parametroResult: event.target.direccion.value
            },
            {
                parametroNombre: "usuario_admin",
                parametroResult: event.target.usuario_admin.value
            },
            {
                parametroNombre: "nombre_de_usuario",
                parametroResult: event.target.nombre_de_usuario.value
            },
            {
                parametroNombre: "contrasenia",
                parametroResult: event.target.contrasenia.value
            }]
        };

        await Send_Info(params).then(
            function(){navigate('/Usuarios')}
        )
    }

    const navigate=useNavigate()
    return (
        <section class="flex flex-col w-full justify-center items-center">
            <div class="self-start ml-20 mt-10">
                <button onClick={() => navigate('/Usuarios')}><IoChevronBackCircleSharp class="w-10 h-10 fill-navy"/></button>
            </div>
            <div class="pt-8 ">
                <h1 class="text-4xl font-bold text-royal">Nuevo Usuario</h1>
            </div>
            <div class="flex flex-col w-1/2 justify-center items-center pt-20">
            <Form onSubmit={Registar_Usuario}>
                <div class="flex flex-col m-4 w-full justify-center items-center">
                    <label class="font-semibold">Nombre</label>
                    <input class="border border-navy w-1/2" name="nombre" id="nombre"></input>
                </div>

                <div class="flex flex-col m-4 w-full justify-center items-center">
                    <label class="font-semibold">Direccion</label>
                    <input class="border border-navy w-1/2" name="direccion" id="direccion"></input>
                </div>

                <div class="flex flex-col m-4 w-full justify-center items-center">
                    <label class="font-semibold">Usuario administrador</label>
                    <select class="border border-navy w-1/2" name="usuario_admin" id="usuario_admin">
                        <option value="0">No</option>
                        <option value="1">Si</option>
                    </select>
                </div>

                <div class="flex flex-col m-4 w-full justify-center items-center">
                    <label class="font-semibold">Nombre de usuario</label>
                    <input class="border border-navy w-1/2" name="nombre_de_usuario" id="nombre_de_usuario"></input>
                </div>

                <div class="flex flex-col m-4 w-full justify-center items-center">
                    <label class="font-semibold">Contraseña</label>
                    <input class="border border-navy w-1/2" name="contrasenia" id="contrasenia"></input>
                </div>

                <button type="submit" class="bg-navy text-white font-semibold p-3 pl-4 pr-4 mb-8 rounded-xl">Enviar</button>
                </Form>
            </div>
        </section>
    )
}