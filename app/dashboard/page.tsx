"use client";

import { FC, useState } from "react";
import Navbar from "../components/shared/Navbar";
import Sidbar from "../components/shared/SidBar";
import TableNota from "../components/TableNota";
import TablePago from "../components/TablePago";

const PagePrueba: FC = () => {
    const [activeTable, setActiveTable] = useState('notas');

    const handleSelectTable = (table: string) => {
        setActiveTable(table);
    };
    return (
        <div className="flex">
            <Sidbar onSelectTable={handleSelectTable} />
            <div className="flex-1 bg-[#F2F4FE]">
                <nav className="bg-white shadow">
                    <Navbar />
                </nav>
                <div className="p-6 bg-gray-50 pt-10">
                    {activeTable === "notas" ? <TableNota /> : <TablePago />}
                </div>
            </div>
        </div>
    );
};

export default PagePrueba;
