import LogTable from "@/components/LogTable";

export default function LogsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Activity Logs</h1>
      <LogTable />
    </div>
  );
}
