interface CartProduct {
    pid: string; 
    quantity?: number; 
}

export interface Cart {
    userId: string;
    items: CartProduct[];
}