export type UserRole = 'admin' | 'manager' | 'analyst' | 'developer';

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    title: string;
    avatar: string;
}