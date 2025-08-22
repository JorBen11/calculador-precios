import { ProductState } from "@/types/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { zustandAsyncStorage } from "./zustandAsyncStorage";

export const useProductStore = create<ProductState>()(
  persist(
    set => ({
      products: [],
      selectedProduct: null,
      clearSelectedProduct: () => set({ selectedProduct: null }),
      addProduct: product => set((state) => ({ products: [...state.products, product] })),
      updateProduct: updated => set((state) => ({ products: state.products.map((m) =>  m.id === updated.id ? updated : m ) })),
      deleteProduct: id => set((state) => ({ products: state.products.filter((m) => m.id !== id) })),
      selectProduct: product => set({ selectedProduct: product }) 
    }),
    { name: 'product-storage', storage: zustandAsyncStorage } // Persistencia en AsyncStorage
  )
);