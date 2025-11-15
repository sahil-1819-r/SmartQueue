import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { joinQueueThunk } from '../store/slices/queueSlice';

const ManualTokenForm = ({ queueId }) => {
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!queueId) return;
    setLoading(true);
    try {
      await dispatch(
        joinQueueThunk({ queueId, payload: { note, manual: true } })
      );
      setNote('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >
      <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Manual Token
      </h4>
      <textarea
        rows={2}
        placeholder="Optional note"
        value={note}
        onChange={(event) => setNote(event.target.value)}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-slate-900 py-2 text-sm font-semibold text-white"
      >
        {loading ? 'Adding...' : 'Add walk-in'}
      </button>
    </form>
  );
};

export default ManualTokenForm;

