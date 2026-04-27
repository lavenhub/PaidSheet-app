import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function DisputeStatus() {
  const { state } = useApp();
  const navigate = useNavigate();
  const dispute = state.disputes[0];

  return (
    <div className="min-h-dvh bg-background flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center mx-auto border border-yellow-200">
          <span className="material-symbols-outlined text-yellow-600 text-[48px]">gavel</span>
        </div>
        <div>
          <h1 className="font-bold text-[32px] text-on-surface mb-2">Dispute Under Review</h1>
          <p className="text-on-surface-variant">Your dispute has been submitted and is being reviewed by our campus integrity team.</p>
        </div>
        {dispute && (
          <div className="bg-white border border-[#F1F1F1] rounded-xl p-6 dry-shadow text-left space-y-3">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-yellow-600">hourglass_top</span>
              <span className="font-semibold text-on-surface">Status: Under Review</span>
            </div>
            <p className="text-sm text-on-surface-variant">Task: <strong>{dispute.taskTitle}</strong></p>
            <p className="text-sm text-on-surface-variant">Reason: <strong>{dispute.reason}</strong></p>
            <p className="text-xs text-on-surface-variant border-t border-[#F1F1F1] pt-3 mt-3">
              Submitted {new Date(dispute.raisedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })} · Expected resolution within 48 hours.
            </p>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <button onClick={() => navigate('/disputes/d1/resolved')} className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-surface-tint transition-all active:scale-[0.98]">
            View Resolution
          </button>
          <button onClick={() => navigate('/asker')} className="w-full bg-[#F1F1F1] text-on-surface py-4 rounded-xl font-semibold hover:bg-[#e2e2e2] transition-colors">
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
