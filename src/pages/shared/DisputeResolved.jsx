import { useNavigate } from 'react-router-dom';

export default function DisputeResolved() {
  const navigate = useNavigate();
  return (
    <div className="min-h-dvh bg-background flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="w-24 h-24 bg-[#D9EAD3] rounded-full flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-primary text-[48px] ms-fill">check_circle</span>
        </div>
        <div>
          <h1 className="font-bold text-[32px] text-on-surface mb-2">Dispute Resolved</h1>
          <p className="text-on-surface-variant">After reviewing the evidence, our team has resolved your dispute in your favour.</p>
        </div>
        <div className="bg-white border border-[#F1F1F1] rounded-xl p-6 dry-shadow text-left space-y-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary ms-fill">verified</span>
            <span className="font-semibold text-on-surface">Decision: Refund Issued</span>
          </div>
          <p className="text-sm text-on-surface-variant">The task payment has been returned to your wallet. The doer has been notified.</p>
        </div>
        <div className="flex flex-col gap-3">
          <button onClick={() => navigate('/asker')} className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-surface-tint transition-all active:scale-[0.98]">
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
