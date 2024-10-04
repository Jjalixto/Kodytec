export interface PagoResponse {
    is_success: boolean;
    message: string;
    data: Pago[];
}

export interface Pago {
    id: string;
    fecha: Date;
    monto: number;
    estado: string;
}