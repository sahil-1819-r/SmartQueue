import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NowServing from '../components/NowServing';
import TokenList from '../components/TokenList';
import useSocket from '../hooks/useSocket';
import {
  fetchQueueAnalyticsThunk,
  fetchQueueById,
  fetchQueueFeedbackThunk,
  fetchQueueTokens,
  joinQueueThunk,
  upsertToken,
} from '../store/slices/queueSlice';

const QueueDetailPage = () => {
  const { queueId } = useParams();
  const dispatch = useDispatch();
  const { activeQueue, tokens, analytics, feedback } = useSelector(
    (state) => state.queue
  );
  const { user } = useSelector((state) => state.auth);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    if (queueId) {
      dispatch(fetchQueueById(queueId));
      dispatch(fetchQueueTokens(queueId));
      dispatch(fetchQueueAnalyticsThunk(queueId));
      dispatch(fetchQueueFeedbackThunk(queueId));
    }
  }, [dispatch, queueId]);

  const handlers = useMemo(
    () => ({
      'token:joinedQueue': (token) => dispatch(upsertToken(token)),
      'token:nowServing': (token) => dispatch(upsertToken(token)),
      'token:completed': (token) => dispatch(upsertToken(token)),
    }),
    [dispatch]
  );

  useSocket(queueId, handlers);

  const handleJoinQueue = async () => {
    setJoining(true);
    try {
      await dispatch(joinQueueThunk({ queueId, payload: {} })).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setJoining(false);
    }
  };

  if (!activeQueue) {
    return <p>Loading queue...</p>;
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2">
        <div>
          <p className="text-sm uppercase text-slate-500">Queue</p>
          <h1 className="text-3xl font-bold">{activeQueue.name}</h1>
          <p className="mt-2 text-slate-600">{activeQueue.description}</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-500 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-100 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Avg wait
              </p>
              <p className="text-xl font-semibold text-slate-900">
                {activeQueue.averageWaitMinutes} minutes
              </p>
            </div>
            <div className="rounded-lg border border-slate-100 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Service time
              </p>
              <p className="text-xl font-semibold text-slate-900">
                {activeQueue.estimatedServiceTime} minutes
              </p>
            </div>
          </div>
          {user && (
            <button
              type="button"
              onClick={handleJoinQueue}
              disabled={joining}
              className="mt-6 rounded-md bg-brand-dark px-4 py-2 text-white"
            >
              {joining ? 'Joining...' : 'Join this queue'}
            </button>
          )}
        </div>
        <NowServing number={activeQueue.nowServing} />
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              Live tokens
            </h2>
            <span className="text-sm text-slate-500">
              {tokens.length} in line
            </span>
          </div>
          <div className="mt-3">
            <TokenList tokens={tokens.slice(0, 10)} />
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Analytics</h3>
            {analytics ? (
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                {analytics.data?.map((row) => {
                  const avgEta = row.avgEta ? Math.round(row.avgEta) : 0;
                  return (
                    <div
                      key={row._id}
                      className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2"
                    >
                      <span className="capitalize">{row._id}</span>
                      <span>
                        {row.count} tokens • {avgEta}m avg ETA
                      </span>
                    </div>
                  );
                })}
                <p className="text-xs text-slate-500">
                  Avg rating:{' '}
                  {analytics.feedback?.avgRating
                    ? analytics.feedback.avgRating.toFixed(1)
                    : 'N/A'}
                </p>
              </div>
            ) : (
              <p className="text-sm text-slate-500">Loading analytics...</p>
            )}
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Feedback</h3>
            <div className="mt-3 space-y-2">
              {feedback?.length ? (
                feedback.slice(0, 3).map((item) => (
                  <div
                    key={item._id}
                    className="rounded-md border border-slate-100 p-3 text-sm"
                  >
                    <p className="font-semibold text-amber-600">
                      {item.rating} / 5
                    </p>
                    <p className="text-slate-600">{item.comment || '—'}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No feedback yet.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QueueDetailPage;

