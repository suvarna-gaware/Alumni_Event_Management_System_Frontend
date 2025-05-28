import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboardCount = () => {
  const [counts, setCounts] = useState({
    alumniCount: 0,
    upcomingEventCount: 0,
    departmentCount: 0,
    organizerCount: 0,
    attendanceCount: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:8766/admin/counts")
      .then((res) => setCounts(res.data))
      .catch((err) => console.error("Failed to load counts:", err));
  }, []);

  const chartData = [
    { name: "Alumni", value: counts.alumniCount },
    { name: "Upcoming Events", value: counts.upcomingEventCount },
    { name: "Departments", value: counts.departmentCount },
    { name: "Organizers", value: counts.organizerCount },
    { name: "Attendance", value: counts.attendanceCount },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto mt-5">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6 text-center">Admin Dashboard Summary (Graph)</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminDashboardCount;
