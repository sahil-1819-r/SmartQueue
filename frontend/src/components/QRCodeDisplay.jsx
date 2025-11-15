import QRCode from 'react-qr-code';

const QRCodeDisplay = ({ value, label }) => (
  <div className="flex flex-col items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
    <QRCode value={value} />
    <p className="text-sm text-slate-500">{label}</p>
  </div>
);

export default QRCodeDisplay;

