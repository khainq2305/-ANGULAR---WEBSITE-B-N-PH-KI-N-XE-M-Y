
export interface IUser {
    id: number;
    name: string;
    password: string;
    email: string;
    role: number;
    createdAt: string;
    updatedAt: string;
    avatar: string | null;
    status: number;
    phone: string | null;
    googleId: string | null;
    gender: 'male' | 'female' | 'other' | null;
    dob: string | null;
    deletedAt: string | null;
  }
  