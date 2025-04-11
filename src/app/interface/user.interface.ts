export interface User {
    id?: number;
    name: string;
    email: string;
    password?: string;
    phone?: string;
    avatar?: string;
    gender: 'male' | 'female' | 'other';
    dob: string; 
    role: number; 
    status?: number; 
    createdAt?: string;
    updatedAt?: string;
  }
  