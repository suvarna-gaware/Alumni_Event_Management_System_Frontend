import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const OrgDashboardCount = () => {
  const location = useLocation();
  const organization = location.state?.organization;
  const orgId = organization?.orgid;

  const [counts, setCounts] = useState({
    upcomingEventCount: 0,
    alumniAttendanceCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orgId) return;

    const fetchCounts = async () => {
      try {
        const response = await axios.get(`http://localhost:8766/counts/${orgId}`);
        setCounts(response.data);
      } catch (err) {
        setError('Failed to fetch counts');
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, [orgId]);

  if (loading) return <p className="text-gray-500 animate-pulse">Loading dashboard summary...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const chartData = [
    { name: 'Upcoming Events', value: counts.upcomingEventCount },
    { name: 'Alumni Attendance', value: counts.alumniAttendanceCount },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6 text-center">Dashboard Summary (Graph)</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
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

export default OrgDashboardCount;
