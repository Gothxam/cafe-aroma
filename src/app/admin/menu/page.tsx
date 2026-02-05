import AdminLayout from "../../../components/admin/AdminLayout";
import MenuTable from "../../../components/admin/MenuTable";
import MenuForm from "../../../components/admin/MenuForm";

export default function AdminMenuPage() {
  return (
    <AdminLayout>
      <h1 className="mb-6 text-2xl font-bold">Menu Management</h1>

      <div className="grid gap-10 lg:grid-cols-2">
        <MenuForm />
        <MenuTable />
      </div>
    </AdminLayout>
  );
}
