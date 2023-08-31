import { Navigate } from 'react-router';
import {Auth} from '../API/service'
import { Form } from 'reactstrap';
import Swal from 'sweetalert2';



export function Login() {

    const Login_User = (event) => {
        event.preventDefault();
        const userValue = event.target.user.value;
        const userPassword = event.target.password.value;
        Auth(userValue,userPassword).then(
            function(res) { if(res == "Auntenticado")window.location.href= "/Inicio" ; else Swal.fire('Error en la autenticación', 'Usuario o contraseña incorrecto' , 'error'); }
        )
    }
    
    

    return (
        <section className="flex flex-col justify-center items-center md:flex-row">
            <div className="w-1/2" >
                <img src="/afigoLogo.jpg" className="w-full"></img>
            </div>
            <div className="w-1/2 mt-10 sm:mt-28">
                <div className="flex flex-col mb-8 mt-10 pl-9 items-center">
                    <h1 className="text-6xl font-bold pb-9">Bienvenido</h1>
                    <h2 className="text-4xl font-bold pb-9">Inicio de Sesión</h2>
                </div>
                <Form onSubmit={Login_User}>
                <div className="flex flex-col items-center">
                    <div>
                    <div className="flex flex-col p-9 md:flex-row">
                        <label className="text-2xl pr-5 pb-4 mr-7">Usuario</label>
                        <input className="w-11/12 shadow-xl" name="user" id="user"></input>
                    </div>
                    <div className="flex flex-col p-9 md:flex-row">
                        <label className="text-2xl pr-5 pb-4">Contraseña</label>
                        <input type="password" className="w-11/12 shadow-xl " name="password" id="password"></input>
                    </div>
                    </div>
                    

                    <button type="submit"  className="bg-blue-900 w-40 p-2 font-bold rounded-2xl mt-4  text-lg">Iniciar Sesión</button>
                </div>
                </Form>
            </div>

            </section>
            
    )
}