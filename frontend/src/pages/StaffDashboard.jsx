import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ManualTokenForm from '../components/ManualTokenForm';
import NowServing from '../components/NowServing';
import TokenList from '../components/TokenList';
import useSocket from '../hooks/useSocket';
import { getOrgQueues } from '../store/slices/orgSlice';
import {
  fetchQueueById,
  fetchQueueTokens,
  markTokenDoneThunk,
  upsertToken,
} from '../store/slices/queueSlice';

const StaffDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orgQueues } = useSelector((state) => state.org);
  const { activeQueue, tokens } = useSelector((state) => state.queue);
  const [queueId, setQueueId] = useState('');

  useEffect(() => {
    if (user?.organization?._id) {
      dispatch(getOrgQueues(user.organization._id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!queueId && orgQueues.length) {
      setQueueId(orgQueues[0]._id);
    }
  }, [queueId, orgQueues]);

  useEffect(() => {
    if (queueId) {
      dispatch(fetchQueueById(queueId));
      dispatch(fetchQueueTokens(queueId));
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

  const handleMarkDone = async (token) => {
    await dispatch(markTokenDoneThunk(token._id));
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase text-slate-500">Staff Dashboard</p>
            <h1 className="text-3xl font-bold text-slate-900">
              {user?.organization?.name}
            </h1>
          </div>
          <select
            value={queueId}
            onChange={(event) => setQueueId(event.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            {orgQueues.map((queue) => (
              <option key={queue._id} value={queue._id}>
                {queue.name}
              </option>
            ))}
          </select>
        </div>
        {activeQueue && (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <NowServing number={activeQueue.nowServing} />
            <ManualTokenForm queueId={queueId} />
          </div>
        )}
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Queue tokens</h2>
        <TokenList tokens={tokens} onMarkDone={handleMarkDone} />
      </section>
    </div>
  );
};

export default StaffDashboard;

