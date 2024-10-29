"use client";
import { useState, useEffect } from "react";

function LogTable() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const response = await fetch(`/api/logs?actionType=someActionType&startDate=2024-01-01&endDate=2024-12-31&page=1`);
      const data = await response.json();
      setLogs(data);
    };
    fetchLogs();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2">Action Type</th>
            <th className="px-4 py-2">Timestamp</th>
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td className="border px-4 py-2">{log.actionType}</td>
              <td className="border px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
              <td className="border px-4 py-2">{log.userId}</td>
              <td className="border px-4 py-2">{log.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LogTable;
