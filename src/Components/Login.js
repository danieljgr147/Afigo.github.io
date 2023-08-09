

export function Login() {
    return (
        <section class="flex flex-col justify-center items-center md:flex-row">
            <div class="w-1/2" >
                <img src="/afigoLogo.jpg" class="w-full"></img>
            </div>
            <div class="w-1/2 mt-28">
                <div class="flex flex-col mb-8 mt-10 pl-9 items-center">
                    <h1 class="text-6xl font-bold pb-9">Bienvenido</h1>
                    <h2 class="text-4xl font-bold pb-9">Inicio de Sesión</h2>
                </div>
                <div class="flex flex-col items-center">
                    <div class="flex flex-col p-9 md:flex-row">
                        <label class="text-2xl pr-5 pb-4">Usuario</label>
                        <input class="w-11/12 shadow-xl"></input>
                    </div>
                    <div class="flex flex-col p-9 md:flex-row">
                        <label class="text-2xl pr-5 pb-4">Contraseña</label>
                        <input class="w-11/12 shadow-xl "></input>
                    </div>

                    <button class="bg-blue-900 w-40 p-2 text-white font-bold rounded-2xl mt-4 ml-10 text-lg">Iniciar Sesión</button>
                </div>
            </div>

            </section>
            
    )
}