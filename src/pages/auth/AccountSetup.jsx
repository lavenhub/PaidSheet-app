import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const DEGREES = [
  'B.Tech Computer Science', 'B.Tech Electronics', 'B.Tech Mechanical',
  'B.E. Civil Engineering', 'BCA', 'MCA', 'MBA', 'M.Tech',
  'B.Sc Physics', 'B.Sc Chemistry', 'B.Sc Mathematics',
  'B.Com', 'BA Economics', 'BA English', 'BBA', 'MBBS', 'BDS', 'Other',
];

const YEARS = ['2025', '2026', '2027', '2028', '2029'];

export default function AccountSetup() {
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', institution: '', degree: '', gradYear: '2026' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.institution.trim()) e.institution = 'Institution is required';
    if (!form.degree) e.degree = 'Please select your degree';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    dispatch({ type: 'COMPLETE_SETUP', payload: { ...form, name: form.name.trim() } });
    navigate('/verify-id/scan');
  };

  const field = (key, label, type = 'text', placeholder = '') => (
    <div className="space-y-1.5">
      <label className="font-semibold text-sm text-on-surface-variant block" htmlFor={key}>{label}</label>
      <input
        id={key}
        type={type}
        value={form[key]}
        onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(ev => ({ ...ev, [key]: '' })); }}
        placeholder={placeholder}
        className={`w-full bg-white border rounded-lg px-4 py-3 font-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-secondary ${errors[key] ? 'border-error' : 'border-outline'}`}
      />
      {errors[key] && <p className="text-error text-xs font-semibold">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="min-h-dvh bg-background flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-white border-b border-[#F1F1F1] h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#F1F1F1] rounded-full transition-colors active:scale-95">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="font-bold text-lg text-[#68B946]">PaidSheet</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-surface-container" />
      </header>

      <main className="flex-1 px-4 pt-24 pb-12 max-w-2xl mx-auto w-full">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h1 className="text-[32px] font-bold text-on-surface">Set Up Your Profile</h1>
              <p className="text-on-surface-variant mt-1">Step 2 of 4 · Account Details</p>
            </div>
            <span className="font-semibold text-sm text-primary uppercase tracking-wider hidden md:block">50% Complete</span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-primary transition-all duration-500" />
          </div>
        </div>

        <div className="bg-white border border-outline-variant rounded-xl p-6 md:p-8 dry-shadow">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {field('name', 'Full Name', 'text', 'e.g., Arjun Mehra')}
            {field('institution', 'Institution / University', 'text', 'e.g., VIT University, Vellore')}

            <div className="space-y-1.5">
              <label className="font-semibold text-sm text-on-surface-variant block" htmlFor="degree">Degree Program</label>
              <div className="relative">
                <select
                  id="degree"
                  value={form.degree}
                  onChange={e => { setForm(f => ({ ...f, degree: e.target.value })); setErrors(ev => ({ ...ev, degree: '' })); }}
                  className={`w-full appearance-none bg-white border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all pr-10 ${errors.degree ? 'border-error' : 'border-outline'}`}
                >
                  <option value="">Select your degree program</option>
                  {DEGREES.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <span className="material-symbols-outlined text-on-surface-variant">expand_more</span>
                </div>
              </div>
              {errors.degree && <p className="text-error text-xs font-semibold">{errors.degree}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-sm text-on-surface-variant block" htmlFor="gradYear">Graduation Year</label>
              <div className="flex gap-3">
                {YEARS.map(yr => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, gradYear: yr }))}
                    className={`flex-1 py-3 rounded-lg border font-semibold text-sm transition-all ${form.gradYear === yr ? 'border-primary-container bg-[#D9EAD3] text-primary' : 'border-outline-variant bg-white text-on-surface-variant hover:bg-surface-container-low'}`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold text-[16px] py-4 rounded-lg hover:bg-surface-tint transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
            >
              Continue to ID Verification
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
