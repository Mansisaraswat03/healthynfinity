"use client";
import { useState, useEffect } from "react";

function LogTable() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const [actionType, setActionType] = useState(""); 

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const query = actionType ? `?actionType=${actionType}` : "";
        const response = await fetch(`/api/logs${query}`);

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
  }, [actionType]); // Re-fetch logs whenever actionType changes

  const handleActionTypeChange = (e) => {
    setActionType(e.target.value);
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex items-center gap-4">
        <label htmlFor="actionTypeFilter" className="font-semibold">
          Filter by Action Type:
        </label>
        <select
          id="actionTypeFilter"
          className="p-2 border rounded"
          value={actionType}
          onChange={handleActionTypeChange}
        >
          <option value="">All</option>
          <option value="login">Login</option>
          <option value="signup">Signup</option>
          <option value="logout">Logout</option>
          <option value="delete_user">Delete User</option>
        </select>
      </div>
      
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
         {
          logs?.length > 0 ? 
          <tbody>
            {logs.map((log) => (
              <tr key={log._id}>
                <td className="border px-4 py-2">{log?.type}</td>
                <td className="border px-4 py-2">
                  {new Date(log?.timestamp).toLocaleString()}
                </td>
                <td className="border px-4 py-2">{log?.userId}</td>
                <td className="border px-4 py-2">{log?.role}</td>
              </tr>
            ))}
          </tbody> :
          <tbody>
            <tr>
              <td colSpan="4" className="border px-4 py-2 text-center">
                No logs found.
              </td>
            </tr>
          </tbody>
         }
        </table>
      )}
    </div>
  );
}

export default LogTable;
