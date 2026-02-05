import AdminLayout from "../../../components/admin/AdminLayout";
import EventForm from "../../../components/admin/EventForm";
import EventTable from "../../../components/admin/EventTable";

export default function AdminEventsPage() {
  return (
    <AdminLayout>
      <h1 className="mb-6 text-2xl font-bold">Events Management</h1>

      <div className="grid gap-10 lg:grid-cols-2">
        <EventForm />
        <EventTable />
      </div>
    </AdminLayout>
  );
}
