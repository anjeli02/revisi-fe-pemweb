import { useParams, Navigate } from "react-router-dom";
import AkunAdminForm from "./AkunAdminForm";
import { useAdminAccountsStore } from "../../../store/useAdminAccounts";

export default function AkunAdminEdit() {
  const { id } = useParams();
  const account = useAdminAccountsStore((s) => s.admins.find((a) => a.id === id));

  if (!account) return <Navigate to="/dashboard/akun-admin" replace />;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-800 mb-1">Edit Admin</h1>
      <p className="text-sm text-stone-500 mb-6">
        {account.name} &middot; {account.email}
      </p>
      <AkunAdminForm existing={account} />
    </div>
  );
}
