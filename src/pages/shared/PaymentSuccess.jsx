import { useNavigate } from 'react-router-dom';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  return (
    <div className="min-h-dvh bg-background flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-center space-y-6">
        <div className="w-24 h-24 bg-[#D9EAD3] rounded-full flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-primary text-[48px] ms-fill">payments</span>
        </div>
        <div>
          <h1 className="font-bold text-[32px] text-on-surface mb-2">Payment Released!</h1>
          <p className="text-on-surface-variant">The payment has been successfully released to the doer. Thank you for using PaidSheet.</p>
        </div>
        <div className="bg-white border border-[#F1F1F1] rounded-xl p-6 dry-shadow">
          <div className="flex items-center gap-3 text-primary">
            <span className="material-symbols-outlined ms-fill text-[28px]">check_circle</span>
            <div className="text-left">
              <p className="font-bold text-on-surface">Transaction Complete</p>
              <p className="text-sm text-on-surface-variant">Confirmation sent to your campus email.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <button onClick={() => navigate('/asker')} className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-surface-tint transition-all active:scale-[0.98]">
            Back to Dashboard
          </button>
          <button onClick={() => navigate('/post/details')} className="w-full bg-[#F1F1F1] text-on-surface py-4 rounded-xl font-semibold hover:bg-[#e2e2e2] transition-colors">
            Post Another Task
          </button>
        </div>
      </div>
    </div>
  );
}
