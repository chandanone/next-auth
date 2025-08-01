// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { StatsChart } from '@/components/StatsChart';
import { ChannelStats } from '@/app/api/youtube-stats/route'; // Import the type

export default function DashboardPage() {
  // Use the ChannelStats type for state
  const [stats, setStats] = useState<ChannelStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/youtube-stats');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // The fetched data will be typed as ChannelStats
        const data: ChannelStats = await response.json();
        setStats(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading statistics...</p>;
  if (error) return <p>Error loading statistics: {error}</p>;

  return (
    <main style={{ maxWidth: '800px', margin: 'auto', padding: '2rem' }}>
      <h1>YouTube Dashboard</h1>
      {stats ? (
        <StatsChart chartData={stats} />
      ) : (
        <p>No statistics to display.</p>
      )}
    </main>
  );
}