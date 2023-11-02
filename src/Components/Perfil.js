import { Nav } from "../Components/Nav";
import { Sidebar } from "../Components/Sidebar";

export function Perfil() {
    return (
        <><Nav />
            <section class="flex flex-row w-full h-full" >
                <div class="h-full">
                    <Sidebar class="w-3/12 h-full" />
                </div>
                <section class="w-full h-[100vh] mt-[2rem] flex flex-col">
                    <div class="w-full flex flex-col pl-[7rem] h-[30vh]">
                        <h1 class="font-bold text-4xl py-4">Bienvenido! Daniel</h1>
                        <p class="py-2">Nombre: Daniel Josue Gonzalez Rodriguez</p>
                        <p class="py-2">Usuario: danijgr</p>
                        <p class="py-2">Sucursal: Palmares</p>
                    </div>

                    <div class=" pl-[7rem] pt-[2rem] w-[100vw] border-b-[4px] border-navy flex flex-row">
                        <div class="bg-navy rounded-t-xl">
                            <h2 class="text-white font-semibold p-2 text-xl">Acciones</h2>
                        </div>
                    </div>

                    <div class="pl-[7rem] pt-[3rem]">
                        <div class="flex flex-col">
                            <div class="mb-[1.5rem]">
                                <button class="bg-grotto p-5 rounded-full font-bold border-none shadow-md text-royal drop-shadow-2xl">Pedir Vacaciones</button>
                            </div>
                            <p class="mb-[1rem] font-semibold">Dias disponibles: 30</p>
                            <div class="flex content-center items-center overflow-x-auto overflow-y-auto w-1/3  shadow-xl sm:rounded-xl">
                                <table class="table-auto border-collapse border border-grotto w-full">
                                    <thead>
                                        <tr class="border-none bg-royal text-white">
                                            <th class="p-2 py-4 border border-mid tracking-wider">Inicio</th>
                                            <th class="p-2 py-4 border border-mid tracking-wider">Fin</th>
                                            <th class="p-2 py-4 border border-mid tracking-wider">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="even:bg-grotto odd:bg-baby">
                                            <th class="p-2 py-4 border-b border-mid tracking-wider text-center">15/05/2023</th>
                                            <th class="p-2 py-4 border-b border-mid tracking-wider text-center">17/05/2023</th>
                                            <th class="p-2 py-4 border-b border-mid tracking-wider text-center">Aprovado</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}