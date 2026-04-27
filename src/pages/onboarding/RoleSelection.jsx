import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function RoleSelection() {
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const [selected, setSelected] = useState('doer');

  const handleContinue = () => {
    dispatch({ type: 'SET_ROLE', payload: selected });
    navigate(selected === 'asker' ? '/asker' : '/feed');
  };

  const Card = ({ role, icon, title, desc, perks }) => (
    <label className="relative group cursor-pointer">
      <input
        type="radio"
        name="role"
        value={role}
        checked={selected === role}
        onChange={() => setSelected(role)}
        className="sr-only"
      />
      <div className={`h-full p-6 bg-white border rounded-xl transition-all duration-200 flex flex-col items-center text-center ${selected === role ? 'border-primary-container ring-1 ring-primary-container' : 'border-[#F1F1F1] hover:bg-zinc-50'}`}>
        <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-primary text-[30px]">{icon}</span>
        </div>
        <h3 className="text-[24px] font-semibold text-on-surface mb-2">{title}</h3>
        <p className="text-on-surface-variant text-sm px-4 leading-relaxed">{desc}</p>
        <div className="mt-6 pt-4 border-t border-[#F1F1F1] w-full grid grid-cols-2 gap-3 text-left">
          {perks.map(p => (
            <div key={p} className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-container text-sm ms-fill">check_circle</span>
              <span className="font-semibold text-[12px] text-on-surface-variant">{p}</span>
            </div>
          ))}
        </div>
        {selected === role && (
          <div className="absolute top-4 right-4">
            <span className="material-symbols-outlined text-primary ms-fill">check_circle</span>
          </div>
        )}
      </div>
    </label>
  );

  return (
    <div className="min-h-dvh bg-background flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-white border-b border-[#F1F1F1] h-16 flex items-center justify-between px-4">
        <span className="text-xl font-extrabold text-[#68B946] tracking-tighter">PaidSheet</span>
        <button className="font-semibold text-zinc-500 hover:bg-zinc-50 transition-colors px-3 py-2 rounded-lg text-sm">
          Need help?
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 pt-16 pb-12">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-[40px] font-bold text-on-surface mb-3">How would you like to start?</h1>
            <p className="text-[18px] text-tertiary">Select the path that fits your current needs. You can always switch later.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <Card
              role="asker"
              icon="post_add"
              title="I want to post tasks"
              desc="Delegate your to-do list to qualified students and get things done efficiently."
              perks={['Post in seconds', 'Secure payments', 'Verified doers', 'Track progress']}
            />
            <Card
              role="doer"
              icon="construction"
              title="I want to complete tasks"
              desc="Browse available tasks on campus, earn money, and build your professional profile."
              perks={['Flexible hours', 'Instant payouts', 'Build reputation', 'Campus proximity']}
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleContinue}
              className="w-full md:w-80 h-14 bg-primary-container text-white font-semibold text-[16px] rounded-lg active:scale-95 duration-150 hover:brightness-95 transition-all shadow-sm"
            >
              Enter Dashboard
            </button>
            <p className="font-semibold text-sm text-tertiary">
              By continuing, you agree to our{' '}
              <a className="text-primary hover:underline" href="#">Terms of Service</a>
            </p>
          </div>
        </div>
      </main>

      {/* Background blur decoration */}
      <div className="fixed -bottom-20 -left-20 w-80 h-80 bg-primary-container opacity-[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="fixed -top-20 -right-20 w-96 h-96 bg-primary opacity-[0.03] rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
