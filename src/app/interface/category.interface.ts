export interface ICategory{
    deletedAt: string | number | Date | null;
    description: string;
    id: number;
    name: string;
    created_at: string;
    status: number; 
    updated_at: string;
    imageUrl: string;
    selected?: boolean;
    productCount?: number;
  }