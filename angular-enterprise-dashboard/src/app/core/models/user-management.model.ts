export type UserStatus = 'active' | 'inactive';
export type UserRole = 'admin' | 'manager' | 'analyst' | 'developer';

export interface ManagedUser {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    team: string;
    title: string;
    status: UserStatus;
    lastActive: string;
    avatar: string;
}

export interface UserQueryParams {
    page: number;
    limit: number;
    search: string;
    role: string;
    status: string;
}

export interface UserListResponse {
    data: ManagedUser[];
    total: number;
}