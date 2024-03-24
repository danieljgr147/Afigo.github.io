import {Routes, Route } from "react-router-dom";
import { Login } from "./Components/Login";
import { Home } from "./Components/Pedido/Home";
import { FormularioV } from "./Components/Pedido/FormularioV"
import { Nav } from "./Components/Nav";
import { Cotizacion } from "./Components/Cotizacion/Cotizacion";
import { FormularioC } from "./Components/Cotizacion/FormularioC";
import { Usuarios } from "./Components/mat_usuarios/Usuarios";
import { FormularioU } from "./Components/mat_usuarios/FormularioU";
import { DetalleP } from "./Components/Detalle/DetalleP";
import { Perfil } from "./Components/Perfil";
import { Prueba } from "./Components/Pedido/Prueba";
import { Proveedor } from "./Components/Proveedores_Pedido/Proveedor";
import { FormularioProveedor } from "./Components/Proveedores_Pedido/FormularioProovedor";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/Inicio" element={<Home/>}></Route>
        <Route path="/Ventas" element={<FormularioV/>}></Route>
        <Route path="/Cotizacion" element={<Cotizacion/>}></Route>
        <Route path="/Usuarios" element={<Usuarios/>}></Route>
        <Route path="/formularioCotizacion" element={<FormularioC/>}></Route>
        <Route path="/Ventas" element={<FormularioV/>}></Route>
        <Route path="/Cotizacion" element={<Cotizacion/>}></Route>
        <Route path="/formularioCotizacion" element={<FormularioC/>}></Route>
        <Route path="/NuevoUsuario" element={<FormularioU/>}></Route>
        <Route path="/det" element={<DetalleP/>}></Route>
        <Route path="/NuevaCotizacion" element={<FormularioC></FormularioC>}></Route>
        <Route path="/Perfil" element={<Perfil></Perfil>}></Route>
        <Route path="/Prueba" element={<Prueba></Prueba>}></Route>
        <Route path="/Proveedores" element={<Proveedor></Proveedor>}></Route>
        <Route path="/FormularioProveedores" element={<FormularioProveedor></FormularioProveedor>}> </Route>
      </Routes>    
    </>
  );
}

export default App;
