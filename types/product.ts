export interface Product {
  id: string;
  name: string;
  description?: string | null;
  quantity: number;
  sellPrice: number;
  dateAdded: string;
  category?: string;
  imageUrl?: string;
  supplier?: string;
  notes?: string;
  isLowStock?: boolean;
}

export interface ProductState {
    products: Product[];
    selectedProduct: Product | null;
    clearSelectedProduct: () => void;
    addProduct: (product: Product) => void;
    updateProduct: (product: Product) => void;
    deleteProduct: (id: string) => void;
    selectProduct: (product: Product | null) => void;
}
