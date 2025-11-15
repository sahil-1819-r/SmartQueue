import { useEffect, useState } from 'react';
import FeedbackForm from '../components/FeedbackForm';
import { fetchUserAnalytics } from '../services/analyticsService';

const UserDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [queueId, setQueueId] = useState('');
  const [tokenId, setTokenId] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await fetchUserAnalytics();
        setMetrics(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm uppercase text-slate-500">User Dashboard</p>
        <h1 className="text-3xl font-bold text-slate-900">
          Your SmartQueue impact
        </h1>
        {loading ? (
          <p className="text-sm text-slate-500">Loading analytics...</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-100 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Queues joined
              </p>
              <p className="text-3xl font-bold text-slate-900">
                {metrics?.totalQueues || 0}
              </p>
            </div>
            <div className="rounded-lg border border-slate-100 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Time saved
              </p>
              <p className="text-3xl font-bold text-slate-900">
                {metrics?.timeSaved || 0} minutes
              </p>
            </div>
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">
          Share feedback
        </h2>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-600">
                Queue ID
              </label>
              <input
                value={queueId}
                onChange={(event) => setQueueId(event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600">
                Token ID
              </label>
              <input
                value={tokenId}
                onChange={(event) => setTokenId(event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          </div>
          {queueId && tokenId ? (
            <div className="mt-4">
              <FeedbackForm queueId={queueId} tokenId={tokenId} />
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">
              Provide queue and token IDs to unlock the feedback form.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;

