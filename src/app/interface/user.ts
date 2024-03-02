export interface User {
    id: number;
    username: string;
    email: string;
    rol: string;
    cart: any[];
    status: string;
    documents: string[];
    last_connection: Date;
}