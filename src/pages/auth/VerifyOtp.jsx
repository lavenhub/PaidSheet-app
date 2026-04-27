import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import OtpInput from '../../components/OtpInput';

export default function VerifyOtp() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(45);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown <= 0) { setCanResend(true); return; }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = async () => {
    setCanResend(false);
    setCountdown(45);
    setOtp(['', '', '', '', '', '']);
    setError('');
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) { setError('Enter the complete 6-digit code.'); return; }
    // For demo: any 6-digit code works
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    dispatch({ type: 'SET_OTP_VERIFIED' });
    navigate('/setup');
  };

  return (
    <div className="min-h-dvh bg-surface flex flex-col">
      {/* TopBar */}
      <header className="bg-white border-b border-[#F1F1F1] fixed top-0 w-full z-50 h-16 flex justify-between items-center px-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/login')} className="p-1.5 hover:bg-zinc-50 rounded transition-colors active:scale-95">
            <span className="material-symbols-outlined text-on-surface">arrow_back</span>
          </button>
          <span className="font-bold text-lg text-[#68B946]">PaidSheet</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-8 pt-20 pb-16">
        <div className="w-full max-w-md bg-white border border-[#F1F1F1] rounded-xl p-12 dry-shadow">
          {/* Icon */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-6 border border-[#F1F1F1]">
              <span className="material-symbols-outlined text-primary text-[32px]">shield_person</span>
            </div>
            <h1 className="text-[32px] font-bold text-on-surface mb-2">Verify Account</h1>
            <p className="text-on-surface-variant text-center px-3">
              Enter the 6-digit verification code sent to<br />
              <strong>{state.auth.email || 'your academic email'}</strong>
            </p>
          </div>

          <form className="space-y-10" onSubmit={handleVerify}>
            <div>
              <OtpInput length={6} value={otp} onChange={setOtp} />
              {error && <p className="text-error text-sm font-semibold mt-3 text-center">{error}</p>}
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#68B946] hover:bg-[#56a338] text-white font-semibold text-[16px] py-4 rounded-lg transition-all active:scale-[0.98] duration-150 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Verifying...
                  </>
                ) : 'Verify OTP'}
              </button>

              <div className="text-center">
                {canResend ? (
                  <button type="button" onClick={handleResend} className="text-primary font-semibold text-sm hover:underline">
                    Resend Code
                  </button>
                ) : (
                  <p className="text-secondary text-sm font-semibold">
                    Resend code in <span className="text-primary font-bold">0:{String(countdown).padStart(2, '0')}</span>
                  </p>
                )}
              </div>
            </div>
          </form>

          <div className="mt-10 pt-6 border-t border-[#F1F1F1] text-center">
            <p className="font-semibold text-xs text-tertiary uppercase tracking-widest mb-4">Academic Marketplace Integrity</p>
            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-zinc-400 text-sm">lock</span>
                <span className="text-xs text-secondary">Secured</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-zinc-400 text-sm">verified</span>
                <span className="text-xs text-secondary">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* BG Decoration */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary-container/10 to-transparent blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-secondary-container/20 to-transparent blur-3xl rounded-full" />
      </div>
    </div>
  );
}
