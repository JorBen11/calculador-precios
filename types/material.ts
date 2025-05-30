export type UnitType = 'g' | 'kg' | 'ml' | 'l' | 'unit' | 'tsp' | 'tbsp' | 'cup';

export interface Material {
  id: string;
  name: string;
  description?: string | null;
  quantity: number;
  unit: string;
  purchasePrice: number;
  purchaseQuantity: number;
  dateAdded: string;
  category?: string;
  imageUrl?: string;
  supplier?: string;
  notes?: string;
  isLowStock?: boolean;
}

export interface MaterialState {
    materials: Material[];
    selectedMaterial: Material | null;
    clearSelectedMaterial: () => void;
    addMaterial: (material: Material) => void;
    updateMaterial: (material: Material) => void;
    deleteMaterial: (id: string) => void;
    selectMaterial: (material: Material | null) => void;
}

export type MaterialFormProps = {
    initialData?: Material;
    onSubmit: (data: Omit<Material, 'id' | 'dateAdded'>) => void;
    submitLabel?: string;
}

export interface MaterialSchemaType {
  name: string;
  description?: string;
  quantity: number;
  unit: string;
  purchasePrice: number;
  purchaseQuantity: number;
}