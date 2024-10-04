import { FC, useEffect, useState } from "react";

import { getAllPayments } from "../service/pago.service";
import { Pago } from "../service/entities/pago.entity";

const TablePago: FC = () => {
    const [pagos, setPagos] = useState<Pago[]>([]);
    const [error, setError] = useState('');
    // const [estado, setEstado] = useState('todos');
    // const [ordenarPorNota, setOrdenarPorNota] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPagos = async () => {
            try {
                setLoading(true);
                const response = await getAllPayments();
                if (response.is_success) {
                    setPagos(response.data);
                } else {
                    setError("No se encontraron cursos");
                }
            } catch (error) {
                setError('Error al obtener los cursos');
            } finally {
                setLoading(false);
            }
        };
        fetchPagos();
    }, []);

    // const handleFilterChange = async () => {
    //     try {
    //         setLoading(true);
    //         const response = await getFilteredCursos(estado, ordenarPorNota ? 'True' : 'False');
    //         setCursos(response?.data || []);
    //     } catch (error) {
    //         setError('Error al aplicar el filtro');
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    return (
        <div className="pt-4">
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
                                    Descripcion
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Fecha
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Monto
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Estado
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Acción
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pagos.length > 0 ? (
                                pagos.map((pago) => (
                                    <tr key={pago.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {pago.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            -
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(pago.fecha).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {pago.monto.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {pago.estado}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {pago.estado === "pendiente" || pago.estado === "vencido" ? (
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                    Pagar
                                                </button>
                                            ) : (
                                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                                    Ver
                                                </button>
                                            )}
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
export default TablePago;