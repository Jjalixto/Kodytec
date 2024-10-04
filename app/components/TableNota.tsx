'use client';

import { FC, useEffect, useState } from "react";
import { Nota } from "../service/entities/nota.entity";
import { getAllCursos, getFilteredCursos } from "../service/nota.service";

const TableNota: FC = () => {

    const [cursos, setCursos] = useState<Nota[]>([]);
    const [error, setError] = useState('');
    const [estado, setEstado] = useState('todos');
    const [ordenarPorNota, setOrdenarPorNota] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                setLoading(true);
                const response = await getAllCursos();
                if (response && response.is_success) {
                    setCursos(response.data);
                } else {
                    setError("No se encontraron cursos");
                }
            } catch (error) {
                setError('Error al obtener los cursos');
            } finally {
                setLoading(false);
            }
        };
        fetchCursos();
    }, []);

    const handleFilterChange = async () => {
        try {
            setLoading(true);
            const response = await getFilteredCursos(estado, ordenarPorNota ? 'True' : 'False');
            setCursos(response?.data || []);
        } catch (error) {
            setError('Error al aplicar el filtro');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>

            {/* Filtros */}
            <div className="mb-6 flex items-center justify-between space-x-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Estado:</label>
                    <select
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:text-black"
                    >
                        <option value="todos">Todos</option>
                        <option value="aprobado">Aprobado</option>
                        <option value="desaprobado">Desaprobado</option>
                    </select>
                </div>

                {/* Filtro ordenar por nota (Switch) */}
                <div className="flex">
                    <span className="text-sm font-medium text-gray-700 mr-2">Ordenar nota de mayor a menor:</span>
                    <label className="flex items-center cursor-pointer">
                        <div className="relative inline-block w-12 h-6">
                            <input
                                type="checkbox"
                                id="ordenarPorNota"
                                checked={ordenarPorNota}
                                onChange={(e) => setOrdenarPorNota(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className={`block w-full h-6 rounded-full transition-colors duration-200 ease-in-out ${ordenarPorNota ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                            <div
                                className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform ${ordenarPorNota ? 'translate-x-6' : ''}`}
                            ></div>
                        </div>
                    </label>
                </div>

                {/* Botón para aplicar el filtro */}
                <button
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleFilterChange}
                >
                    Aplicar Filtro
                </button>
            </div>

            {/* Spinner de carga */}
            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="w-10 h-10 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
                    <span className="ml-4 text-blue-500 font-medium">Cargando...</span>
                </div>
            ) : (
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Id
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Curso
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Nota
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Grado
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Profesor
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Estado
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {cursos.length > 0 ? (
                                cursos.map((curso) => (
                                    <tr key={curso.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {curso.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {curso.nombreCurso}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {curso.nota}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {curso.grado}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {curso.profesor}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {curso.estado}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        className="px-6 py-6 whitespace-nowrap text-center text-sm font-medium text-gray-500"
                                        colSpan={6}
                                    >
                                        <div className="flex justify-center items-center py-20 bg-red-100 text-red-600 rounded-lg mt-6 p-4">
                                            <div className="text-2xl mr-4">😔</div>
                                            <span className="font-medium">Ups!... {error}</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TableNota;
