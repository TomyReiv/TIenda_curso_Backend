export interface Producto {
    category: string;
    code: string;
    createdAt: string;
    description: string;
    owner: string;
    price: number;
    status: string;
    stock: number;
    thumbnail: any[]; // Dependiendo del tipo de datos que contenga el array
    title: string;
    updatedAt: string;
    _id: string;
}
