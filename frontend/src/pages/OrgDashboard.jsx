import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QueueCreator from '../components/QueueCreator';
import QRCodeDisplay from '../components/QRCodeDisplay';
import NowServing from '../components/NowServing';
import { getOrgQueues } from '../store/slices/orgSlice';

const OrgDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orgQueues } = useSelector((state) => state.org);
  const [selectedQueueId, setSelectedQueueId] = useState(null);

  useEffect(() => {
    if (user?.organization?._id) {
      dispatch(getOrgQueues(user.organization._id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!selectedQueueId && orgQueues.length) {
      setSelectedQueueId(orgQueues[0]._id);
    }
  }, [selectedQueueId, orgQueues]);

  const selectedQueue = orgQueues.find((q) => q._id === selectedQueueId);
  const queueLink = selectedQueue
    ? `${window.location.origin}/queues/${selectedQueue._id}`
    : '';

  const handleQueueCreated = () => {
    if (user?.organization?._id) {
      dispatch(getOrgQueues(user.organization._id));
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm uppercase text-slate-500">Organization Owner</p>
        <h1 className="text-3xl font-bold text-slate-900">
          {user?.organization?.name || 'Your organization'}
        </h1>
        <p className="text-slate-600">
          Manage multiple queues, distribute QR codes, and monitor now-serving
          states in real time.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <QueueCreator onCreated={handleQueueCreated} />
        {selectedQueue ? (
          <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{selectedQueue.name}</h3>
              <select
                value={selectedQueueId}
                onChange={(event) => setSelectedQueueId(event.target.value)}
                className="rounded-md border border-slate-300 px-2 py-1 text-sm"
              >
                {orgQueues.map((queue) => (
                  <option key={queue._id} value={queue._id}>
                    {queue.name}
                  </option>
                ))}
              </select>
            </div>
            <NowServing number={selectedQueue.nowServing} />
            <QRCodeDisplay value={queueLink} label="Share with walk-ins" />
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500">
            Create a queue to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrgDashboard;

