import { Link } from 'react-router-dom';

const QueueList = ({ queues = [] }) => {
  if (!queues.length) {
    return (
      <div className="rounded-md border border-dashed border-slate-300 p-6 text-center text-slate-500">
        No queues available yet.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {queues.map((queue) => (
        <div
          key={queue._id}
          className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{queue.name}</h3>
            <span
              className={`text-xs font-semibold uppercase ${
                queue.active ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {queue.active ? 'Active' : 'Paused'}
            </span>
          </div>
          <p className="text-sm text-slate-600">{queue.description}</p>
          <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
            <span>Now Serving: {queue.nowServing || '—'}</span>
            <span>Avg Wait: {queue.averageWaitMinutes}m</span>
          </div>
          <Link
            to={`/queues/${queue._id}`}
            className="mt-4 inline-flex items-center text-sm font-semibold text-brand"
          >
            View live queue →
          </Link>
        </div>
      ))}
    </div>
  );
};

export default QueueList;

