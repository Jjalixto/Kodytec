export interface AuthResponse {
    is_success: boolean;
    message: string;
    data: {
        codigo: string;
        nombre: string;
        apellido: string;
    };
}
