import { useNavigate } from 'react-router-dom';

export default function PaymentFailed() {
  const navigate = useNavigate();
  return (
    <div className="min-h-dvh bg-background flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-center space-y-6">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto border border-red-100">
          <span className="material-symbols-outlined text-error text-[48px]">error</span>
        </div>
        <div>
          <h1 className="font-bold text-[32px] text-on-surface mb-2">Payment Failed</h1>
          <p className="text-on-surface-variant">There was an issue processing the payment. Please try again or contact support.</p>
        </div>
        <div className="flex flex-col gap-3">
          <button onClick={() => navigate(-1)} className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-surface-tint transition-all">
            Retry Payment
          </button>
          <button onClick={() => navigate('/asker')} className="w-full bg-[#F1F1F1] text-on-surface py-4 rounded-xl font-semibold hover:bg-[#e2e2e2] transition-colors">
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
