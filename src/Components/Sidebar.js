
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineForm } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { HiMenuAlt3 } from "react-icons/hi";
import { BsCartPlus } from "react-icons/bs";

export function Sidebar(){
  const userType = sessionStorage.getItem('usuario_admin')
  const menus = [
    { name: "Pedidos", link: "/Inicio", icon: AiOutlineShoppingCart },
    { name: "Cotizaciones", link: "/Cotizacion", icon: AiOutlineForm },
    { name: "Proveedores", link: "/Proveedores", icon: BsCartPlus },
    { name: "Usuarios", link: "/Usuarios", icon: AiOutlineUser },
  ];
  const [open, setOpen] = useState(false);
  return (
    <section className="flex gap-6 absolute z-50 h-full">
      <div
        className={`bg-navy h-full ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer text-white"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
        {menus?.map((menu, i) => {
            // Condición para renderizar el enlace solo si el userType es 1
            if (menu.name === "Usuarios" && userType == 0) {
              return null; // No renderizar el enlace
            }

            return (
              <Link
                to={menu?.link}
                key={i}
                className={` ${
                  menu?.margin && "mt-5"
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md text-white`}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden `}
                >
                  {menu?.name}
                </h2>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
