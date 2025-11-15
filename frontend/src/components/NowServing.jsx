const NowServing = ({ number = 0, eta }) => (
  <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-brand to-brand-dark p-6 text-white shadow-md">
    <p className="text-sm uppercase tracking-widest text-white/80">
      Now Serving
    </p>
    <p className="mt-2 text-5xl font-bold">{number || '—'}</p>
    {eta ? (
      <p className="mt-2 text-sm text-white/90">ETA: {eta} minutes</p>
    ) : null}
  </div>
);

export default NowServing;

