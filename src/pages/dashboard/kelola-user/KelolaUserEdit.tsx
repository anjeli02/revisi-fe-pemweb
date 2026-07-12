import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import KelolaUserForm from "./KelolaUserForm";
import { api } from "../../../lib/axios";

export default function KelolaUserEdit() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api
      .get(`/users/${id}`)
      .then((res) => setUser(res.data))
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) return <Navigate to="/dashboard/kelola-user" replace />;
  if (!user) return <p className="text-stone-400 p-6">Memuat...</p>;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-800 mb-1">Edit User</h1>
      <p className="text-sm text-stone-500 mb-6">
        {user.username} &middot; {user.email}
      </p>
      <KelolaUserForm existing={user} />
    </div>
  );
}
