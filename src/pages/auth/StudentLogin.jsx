import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function StudentLogin() {
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email) return 'Please enter your institution email.';
    if (!email.includes('@') || !email.includes('.')) return 'Enter a valid email address.';
    // Allow any .edu or university domain
    const domain = email.split('@')[1] || '';
    if (!domain.includes('.')) return 'Enter a valid institution email.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);
    dispatch({ type: 'SET_EMAIL', payload: email });
    // Simulate OTP send delay
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    navigate('/verify-otp');
  };

  return (
    <div className="min-h-dvh bg-background flex flex-col">
      {/* TopBar */}
      <header className="fixed top-0 w-full z-50 bg-white border-b border-[#F1F1F1] h-16 flex items-center justify-between px-4">
        <span className="text-xl font-extrabold text-[#68B946] tracking-tighter">PaidSheet</span>
        <button className="text-zinc-500 font-semibold hover:bg-zinc-50 transition-colors px-3 py-2 rounded text-sm">
          Help
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 pt-16 pb-8">
        <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Visual */}
          <div className="hidden lg:flex lg:col-span-7 flex-col gap-6">
            <div className="bg-white border border-[#F1F1F1] rounded-xl p-8 relative overflow-hidden h-[500px] flex flex-col justify-end">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80"
                  alt="University Library"
                  className="w-full h-full object-cover grayscale opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              </div>
              <div className="relative z-10">
                <span className="bg-[#D9EAD3] text-[#236d00] font-semibold text-sm px-3 py-1 rounded-full mb-4 inline-block">
                  Campus Exclusive
                </span>
                <h1 className="text-[40px] font-bold text-on-surface mb-4">
                  Precision tools for the modern student.
                </h1>
                <p className="text-[18px] text-tertiary max-w-md">
                  Connect your institutional identity to unlock a marketplace built on academic trust and verified reliability.
                </p>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white border border-[#F1F1F1] p-8 rounded-xl dry-shadow">
              <div className="mb-8">
                <h2 className="text-[32px] font-bold text-on-surface mb-2">Student Login</h2>
                <p className="text-on-surface-variant">Access your academic work profile.</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="font-semibold text-sm text-on-surface-variant flex justify-between" htmlFor="email">
                    Institution Email
                    <span className="text-primary font-semibold">Use @university.edu</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">school</span>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setError(''); }}
                      placeholder="yourname@university.edu"
                      className={`w-full pl-10 pr-4 py-3 bg-white border rounded focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all text-on-surface ${error ? 'border-error' : 'border-[#D9D9D9]'}`}
                      required
                    />
                  </div>
                  {error && <p className="text-error text-xs font-semibold">{error}</p>}
                  <p className="text-[12px] text-zinc-400 font-medium">Verification will be sent to this address.</p>
                </div>

                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#68B946] text-white py-4 rounded font-semibold text-[16px] hover:bg-[#59a33a] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        Send OTP
                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                      </>
                    )}
                  </button>

                  <div className="relative py-2 flex items-center">
                    <div className="flex-grow border-t border-[#F1F1F1]" />
                    <span className="flex-shrink mx-4 text-zinc-400 font-semibold text-xs uppercase tracking-widest">Campus Support</span>
                    <div className="flex-grow border-t border-[#F1F1F1]" />
                  </div>

                  <a
                    href="mailto:support@paidsheet.in"
                    className="w-full bg-[#F1F1F1] text-on-surface py-3 rounded font-semibold text-[14px] flex items-center justify-center gap-2 hover:bg-[#e8e8e8] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">help_center</span>
                    Contact Support
                  </a>
                </div>
              </form>

              <div className="mt-8 p-4 bg-surface-container-low rounded border border-[#F1F1F1] flex gap-3">
                <span className="material-symbols-outlined text-primary ms-fill">verified_user</span>
                <div>
                  <p className="font-semibold text-[13px] text-on-surface">Verified Institution Only</p>
                  <p className="text-[12px] text-tertiary">Only users with valid campus domains can access the marketplace.</p>
                </div>
              </div>
            </div>

            <footer className="mt-6 text-center">
              <p className="text-[13px] text-zinc-400">
                © 2024 PaidSheet. All rights reserved.
                <a className="ml-2 underline hover:text-primary transition-colors" href="#">Privacy</a>
                <a className="ml-2 underline hover:text-primary transition-colors" href="#">Terms</a>
              </p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
