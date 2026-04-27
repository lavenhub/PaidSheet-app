import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function IdVerificationReview() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    dispatch({ type: 'SET_ID_VERIFIED' });
    navigate('/campus-precision');
  };

  return (
    <div className="min-h-dvh bg-background flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-white border-b border-[#F1F1F1] h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#F1F1F1] rounded-full active:scale-95">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="font-bold text-[#68B946] text-lg">PaidSheet</span>
        </div>
      </header>

      <main className="flex-1 pt-24 pb-12 px-4 max-w-xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-[32px] font-bold text-on-surface">Review Your ID</h1>
          <p className="text-on-surface-variant mt-1">Step 3 of 4 · Confirm Details</p>
          <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden mt-3">
            <div className="h-full w-3/4 bg-primary" />
          </div>
        </div>

        {/* Success card */}
        <div className="bg-white border border-[#F1F1F1] rounded-xl p-6 dry-shadow mb-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#D9EAD3] flex items-center justify-center">
              <span className="material-symbols-outlined text-primary ms-fill">verified</span>
            </div>
            <div>
              <h2 className="font-bold text-on-surface">ID Scan Successful</h2>
              <p className="text-sm text-on-surface-variant">Details extracted automatically</p>
            </div>
          </div>

          {/* Extracted Fields */}
          <div className="space-y-3">
            {[
              { icon: 'person', label: 'Full Name', value: state.user.name || 'Arjun Mehra' },
              { icon: 'school', label: 'Institution', value: state.user.institution || 'VIT University' },
              { icon: 'badge', label: 'Student ID', value: '22BCE1047' },
              { icon: 'history_edu', label: 'Degree', value: state.user.degree || 'B.Tech Computer Science' },
            ].map(f => (
              <div key={f.label} className="flex items-center gap-4 p-3 bg-surface-container-low rounded-lg">
                <span className="material-symbols-outlined text-primary">{f.icon}</span>
                <div>
                  <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider">{f.label}</p>
                  <p className="font-bold text-on-surface">{f.value}</p>
                </div>
                <span className="material-symbols-outlined text-primary ms-fill ml-auto text-[20px]">check_circle</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#F1F1F1] rounded-xl p-4 dry-shadow flex items-start gap-3 mb-6">
          <span className="material-symbols-outlined text-primary">info</span>
          <p className="text-sm text-on-surface-variant">
            If any details are incorrect, go back and re-scan your ID. Your information is encrypted and stored securely.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-4 border border-outline-variant rounded-lg font-semibold text-on-surface-variant hover:bg-surface-container-low transition-colors active:scale-95"
          >
            Re-scan
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-[2] bg-primary text-white py-4 rounded-lg font-semibold hover:bg-surface-tint transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            ) : (
              <><span className="material-symbols-outlined ms-fill text-[20px]">verified</span>Confirm & Continue</>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
