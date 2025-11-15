import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitFeedbackThunk } from '../store/slices/queueSlice';

const FeedbackForm = ({ queueId, tokenId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await dispatch(
        submitFeedbackThunk({ rating, comment, queue: queueId, token: tokenId })
      ).unwrap();
      setComment('');
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >
      <h4 className="font-semibold">Rate your experience</h4>
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setRating(value)}
            className={`h-10 w-10 rounded-full border ${
              value <= rating
                ? 'border-amber-400 bg-amber-100 text-amber-700'
                : 'border-slate-200 text-slate-500'
            }`}
          >
            {value}
          </button>
        ))}
      </div>
      <textarea
        rows={3}
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Tell us more..."
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-brand py-2 text-white"
      >
        {submitting ? 'Sending...' : 'Submit feedback'}
      </button>
    </form>
  );
};

export default FeedbackForm;

