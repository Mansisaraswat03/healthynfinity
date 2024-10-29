"use client";
import { useState, useEffect } from "react";

function LogTable() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(`/api/logs`);
        
        // Check if the response is OK and can be parsed as JSON
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setLogs(data);
      } catch (err) {
        console.error("Failed to fetch logs:", err);
        setError("Failed to fetch logs. Please try again later.");
      }
    };
    
    fetchLogs();
  }, []);

  return (
    <div className="overflow-x-auto">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
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
                <td className="border px-4 py-2">{log?.actionType}</td>
                <td className="border px-4 py-2">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="border px-4 py-2">{log?.userId}</td>
                <td className="border px-4 py-2">{log?.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LogTable;
