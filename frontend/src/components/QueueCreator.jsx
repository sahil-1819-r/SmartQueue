import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createQueueThunk } from '../store/slices/queueSlice';

const defaultForm = {
  name: '',
  description: '',
  averageWaitMinutes: 5,
  estimatedServiceTime: 5,
};

const QueueCreator = ({ onCreated }) => {
  const [form, setForm] = useState(defaultForm);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const queue = await dispatch(
        createQueueThunk({
          ...form,
          averageWaitMinutes: Number(form.averageWaitMinutes),
          estimatedServiceTime: Number(form.estimatedServiceTime),
        })
      ).unwrap();
      onCreated?.(queue);
      setForm(defaultForm);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold">Create a queue</h3>
      <div>
        <label className="block text-sm font-medium text-slate-600">
          Queue name
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-600">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-600">
            Avg wait (m)
          </label>
          <input
            type="number"
            min="1"
            name="averageWaitMinutes"
            value={form.averageWaitMinutes}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600">
            Service time (m)
          </label>
          <input
            type="number"
            min="1"
            name="estimatedServiceTime"
            value={form.estimatedServiceTime}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-brand-dark py-2 text-white"
      >
        {submitting ? 'Creating...' : 'Create queue'}
      </button>
    </form>
  );
};

export default QueueCreator;

