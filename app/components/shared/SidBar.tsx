'use client';

import { DarkThemeToggle } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";
import { RiExchangeLine, RiLogoutBoxRFill, RiNotification2Line, RiSurveyLine } from "react-icons/ri";

interface SidebarProps {
    onSelectTable: (table: string) => void;
}

const Sidbar: FC<SidebarProps> = ({ onSelectTable }) => {

    const router = useRouter();
    const handlerLogout = useCallback(async () => {
        try {
            localStorage.removeItem('authToken');
            router.push('/login');
        } catch (error) {
            console.error('Error al cerrar sesión', error);
        }
    }, [router]);

    return (
        <aside className="w-56 text-white h-screen dark:bg-slate-800">
            <div className="px-6 pb-4 pt-3">
                <div className="border-2 border-slate-800 rounded-full dark:border-white shadow-lg transition-transform duration-300 hover:scale-105">
                    <div className="flex items-center py-1 px-2 bg-white dark:bg-gray-800 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 pr-8">
                        <div className="flex items-center space-x-3  border-indigo-500 pr-4 py-2">
                            <DarkThemeToggle className="text-xl text-blue-600 transition-transform duration-300 hover:scale-125 hover:text-blue-500" />
                            <RiNotification2Line className="text-xl text-black dark:text-white transition-transform duration-300 hover:scale-125 hover:text-blue-500" />
                        </div>
                        <span className="text-md font-semibold text-white py-2 px-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 shadow-md transition duration-300 transform hover:scale-105">
                            Kodytec
                        </span>
                    </div>
                </div>

                <div>
                    <div>
                        <div className="py-8">
                            <h5 className="uppercase font-bold text-primary dark:text-cyan-500">Registro</h5>
                            <ul>
                                <li>
                                    <a onClick={() => onSelectTable("notas")} className="flex text-black dark:hover:bg-gray-600 dark:text-gray-300 items-center gap-4 p-2 hover:bg-gray-200 transition hover:translate-x-2 ease-out duration-300 rounded-lg">
                                        <RiSurveyLine className="text-[1.25rem]" />
                                        <span>Notas</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={() => onSelectTable("pagos")} className="flex text-black dark:hover:bg-gray-600 dark:text-gray-300 items-center gap-4 p-2 hover:bg-gray-200 transition hover:translate-x-2 ease-out duration-300 rounded-lg">
                                        <RiExchangeLine className="text-[1.25rem]" />
                                        <span>Pagos</span>
                                    </a>
                                </li>
                            </ul>
                            <h5 className="uppercase pt-5 text-primary dark:text-cyan-500">Otros</h5>
                            <ul>
                                <li>
                                    <a href="#" className="flex text-black dark:hover:bg-gray-600 dark:text-gray-300 items-center gap-4 p-2 hover:bg-gray-200 transition hover:translate-x-2 ease-out duration-300 rounded-lg">
                                        <RiSurveyLine className="text-[1.25rem]" />
                                        <span>Próximan...</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="pt-14">
                            <Image src="/images/sidebar.svg" className="my-2" alt="sidebar image" width={400} height={200} priority />
                            <button onClick={handlerLogout} className="flex justify-center items-center text-black rounded-lg p-2 mx-5 my-0 font-semibold transition transform hover:bg-primary scale-105 ease-out duration-500 dark:text-white">
                                <RiLogoutBoxRFill />
                                <span className="">Cerrar Sesión</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidbar;
