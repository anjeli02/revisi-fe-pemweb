import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AkunAdminForm from "./AkunAdminForm";
import { api } from "../../../lib/axios";

export default function AkunAdminEdit() {
  const { id } = useParams();
  const [account, setAccount] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api.get(`/users/${id}`)
      .then((res) => setAccount(res.data))
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) return <Navigate to="/dashboard/akun-admin" replace />;
  if (!account) return <p className="text-stone-400 p-6">Memuat...</p>;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-800 mb-1">Edit Admin</h1>
      <p className="text-sm text-stone-500 mb-6">{account.username} · {account.email}</p>
      <AkunAdminForm existing={account} />
    </div>
  );
}