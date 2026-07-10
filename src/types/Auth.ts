export type Role = "super_admin" | "admin" | "user";

export type User = {
    id: string;
    name: string;
    email: string;
    role: Role;
};

export type LoginRespone = {
    user: User;
    token: string;
};

export type LoginInput = {
    email: string;
    password: string;
};

export type RegisterInput = {
    name: string;
    email: string;
    password: string;
};
