import React, { useState } from "react";
import { fetchAnalyses, fetchLogs } from "../api";

const AdminDashboard = () => {
  const [analyses, setAnalyses] = useState([]);
  const [logs, setLogs] = useState("");
  const [auth, setAuth] = useState({ username: "", password: "" });
  const [showLogs, setShowLogs] = useState(false);
  const [error, setError] = useState("");

  async function handleFetchAnalyses() {
    try {
      const res = await fetchAnalyses(auth);
      setAnalyses(res.data.analyses);
      setError("");
    } catch (e) {
      setError("Unauthorized or server error");
    }
  }
  async function handleFetchLogs() {
    try {
      const res = await fetchLogs(auth);
      setLogs(res.data.logs);
      setShowLogs(true);
      setError("");
    } catch (e) {
      setError("Unauthorized or server error");
    }
  }

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <input placeholder="admin user" value={auth.username} onChange={e => setAuth({ ...auth, username: e.target.value })} />
      <input placeholder="admin pass" type="password" value={auth.password} onChange={e => setAuth({ ...auth, password: e.target.value })} />
      <button onClick={handleFetchAnalyses}>Show Analyses</button>
      <button onClick={handleFetchLogs}>Show Logs</button>
      {error && <div className="error">{error}</div>}
      {analyses.length > 0 && (
        <div className="analyses">
          <h3>Past Analyses</h3>
          <ul>
            {analyses.map((a, i) => (
              <li key={i}>{a.timestamp} - {a.file} - {a.result}</li>
            ))}
          </ul>
        </div>
      )}
      {showLogs && (
        <div className="logs">
          <h3>Server Logs</h3>
          <pre style={{ maxHeight: 250, overflow: "auto" }}>{logs}</pre>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;