import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function CampusPrecision() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [locating, setLocating] = useState(false);
  const [located, setLocated] = useState(false);
  const [campus] = useState(state.user.institution || 'VIT University, Vellore');

  const handleLocate = () => {
    setLocating(true);
    setTimeout(() => { setLocating(false); setLocated(true); }, 2000);
  };

  const handleConfirm = () => {
    dispatch({ type: 'SET_CAMPUS_VERIFIED' });
    navigate('/role');
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
          <h1 className="text-[32px] font-bold text-on-surface">Campus Verification</h1>
          <p className="text-on-surface-variant mt-1">Step 4 of 4 · Confirm Your Campus</p>
          <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden mt-3">
            <div className="h-full w-full bg-primary transition-all duration-500" />
          </div>
        </div>

        <div className="bg-white border border-[#F1F1F1] rounded-xl overflow-hidden dry-shadow mb-4">
          {/* Map placeholder */}
          <div className="relative h-56 bg-surface-container">
            <img
              src="https://images.unsplash.com/photo-1577985043696-8507e8cb3e93?w=600&q=60"
              alt="Campus map"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              {located ? (
                <div className="bg-white rounded-2xl px-6 py-4 dry-shadow flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-[#D9EAD3] flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary ms-fill text-[28px]">location_on</span>
                  </div>
                  <span className="font-bold text-on-surface text-sm text-center">{campus}</span>
                  <span className="text-xs text-primary font-semibold">Campus boundary confirmed ✓</span>
                </div>
              ) : (
                <div className="bg-white/90 rounded-xl px-4 py-3 text-center">
                  <span className="material-symbols-outlined text-[40px] text-primary/40">location_searching</span>
                  <p className="text-sm text-on-surface-variant font-semibold">Tap "Detect My Campus" below</p>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-start gap-3 p-3 bg-surface-container-low rounded-lg">
              <span className="material-symbols-outlined text-primary">school</span>
              <div>
                <p className="font-bold text-on-surface text-sm">Detected Campus</p>
                <p className="text-on-surface-variant text-sm">{campus}</p>
              </div>
              {located && <span className="material-symbols-outlined text-primary ms-fill ml-auto">check_circle</span>}
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              PaidSheet uses campus geofencing to ensure only verified students within your institution can participate. Your location is used only for campus verification and task proximity.
            </p>

            {!located ? (
              <button
                onClick={handleLocate}
                disabled={locating}
                className="w-full bg-primary text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-surface-tint transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {locating ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Detecting Campus...
                  </>
                ) : (
                  <><span className="material-symbols-outlined">my_location</span>Detect My Campus</>
                )}
              </button>
            ) : (
              <button
                onClick={handleConfirm}
                className="w-full bg-[#68B946] text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#56a338] transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined ms-fill">verified</span>
                Confirm & Enter PaidSheet
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
