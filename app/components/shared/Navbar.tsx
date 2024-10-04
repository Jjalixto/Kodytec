'use client';

import { useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar: FC = () => {
    const [user, setUser] = useState<{ nombre?: string; apellido?: string; email?: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('usuario');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handlerLogout = useCallback(async () => {
        try {
            localStorage.removeItem('authToken');
            router.push('/login');
        } catch (error) {
            console.error('Error cerrando sesión', error);
        }
    }, [router]);

    return (
        <div className="max-w-7xl mx-auto px-6 py-4 dark:bg-slate-800">
            <div className="relative flex justify-end items-center">
                <div className="text-2xl px-1">
                    <FaUserCircle />
                </div>

                {/* Contenedor del nombre y apellido */}
                <div className="relative group">
                    <div className="text-lg px-1 cursor-pointer">
                        {/* Solo el nombre y apellido aquí */}
                        {user?.nombre} {user?.apellido}
                    </div>

                    {/* Menú desplegable */}
                    <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg dark:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ul className="py-1">
                            <li>
                                <a
                                    onClick={handlerLogout}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Cerrar Sesión
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
