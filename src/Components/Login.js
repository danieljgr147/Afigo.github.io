import { Navigate } from 'react-router';
import { Auth } from '../API/service'
import { Form } from 'reactstrap';
import Swal from 'sweetalert2';


export function Login() {

    const Login_User = (event) => {
        event.preventDefault();
        const userValue = event.target.user.value;
        const userPassword = event.target.password.value;
        Auth(userValue, userPassword).then(
            function (res) { if (res == "Auntenticado") window.location.href = "/Inicio"; else Swal.fire('Error en la autenticación', 'Usuario o contraseña incorrecto', 'error'); }
        )
    }



    return (
        <section className="flex flex-col h-[100vh] justify-center items-center md:flex-row">
            <div className="hidden lg:flex w-1/2" >
                <img src="/sierra.jpg" className="w-full lg:h-[100vh]"></img>
            </div>
            <div className="w-full bg-darkb flex flex-col justify-center items-center h-[100vh] lg:w-1/2">
                <div className="flex flex-col mb-8 mt-10 pl-9 items-center">
                    <img src="/afigoLogo12.png" class="max-w-[50%]"></img>
                </div>
                <Form onSubmit={Login_User} class="lg:w-1/2">
                    <div className="flex flex-col items-center">
                        <div class="max-w-[100%] lg:w-full">
                            <div className="flex flex-col py-9 pl-[1.5rem] pr-0 md:flex-row">
                                <input className="w-full shadow-xl bg-[#d9d9d9] p-2 rounded-xl" placeholder='Usuario' name="user" id="user"></input>
                            </div>
                            <div className="flex flex-col py-9 pr-0 pl-[1.5rem] md:flex-row">
                                <input type="password" className="w-full shadow-xl bg-[#d9d9d9] p-2 rounded-xl" placeholder='Contraseña' name="password" id="password"></input>
                            </div>
                            <div className="flex flex-col p-9 items-center lg:pr-0">
                                <button type="submit" class="bg-navy text-white font-semibold p-3 pl-4 pr-4 mb-8 rounded-3xl lg:w-[60%] xl:w-[50%]">Iniciar Sesión</button>
                            </div>
                        </div>



                    </div>
                </Form>
            </div>

        </section>

    )
}