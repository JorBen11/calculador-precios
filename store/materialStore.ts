import { MaterialState } from '@/types/material';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { zustandAsyncStorage } from './zustandAsyncStorage';

export const useMaterialStore = create<MaterialState>()(
  persist(
    set => ({
      materials: [],
      selectedMaterial: null,
      clearSelectedMaterial: () => set({ selectedMaterial: null }),
      addMaterial: material => set((state) => ({ materials: [...state.materials, material] })),
      updateMaterial: updated => set((state) => ({ materials: state.materials.map((m) =>  m.id === updated.id ? updated : m ) })),
      deleteMaterial: id => set((state) => ({ materials: state.materials.filter((m) => m.id !== id) })),
      selectMaterial: material => set({ selectedMaterial: material }) 
    }),
    { name: 'material-storage', storage: zustandAsyncStorage } // Persistencia en AsyncStorage
  )
);