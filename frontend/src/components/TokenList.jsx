const statusColor = {
  waiting: 'text-amber-600',
  serving: 'text-green-600',
  done: 'text-slate-500',
};

const TokenList = ({ tokens = [], onMarkDone }) => {
  if (!tokens.length) {
    return (
      <p className="text-sm text-slate-500">No tokens in this queue yet.</p>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Token #
            </th>
            <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </th>
            <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              ETA (m)
            </th>
            <th className="px-4 py-2" />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white text-sm">
          {tokens.map((token) => (
            <tr key={token._id}>
              <td className="px-4 py-2 font-semibold">#{token.number}</td>
              <td className={`px-4 py-2 capitalize ${statusColor[token.status]}`}>
                {token.status}
              </td>
              <td className="px-4 py-2">{token.etaMinutes ?? '—'}</td>
              <td className="px-4 py-2 text-right">
                {token.status !== 'done' && (
                  <button
                    type="button"
                    onClick={() => onMarkDone?.(token)}
                    className="rounded-md bg-emerald-600 px-3 py-1 text-xs font-semibold text-white"
                  >
                    Mark done
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TokenList;

