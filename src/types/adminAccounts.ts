export type AdminRole = "super_admin" | "admin";

export type AdminAccount = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  createdAt: string;
};
