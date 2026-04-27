import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import TopBar from '../../components/TopBar';
import BottomNav from '../../components/BottomNav';

export default function AccountSettings() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: state.user.name,
    email: state.auth.email || state.user.email,
    institution: state.user.institution,
    degree: state.user.degree,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_PROFILE', payload: form });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Field = ({ label, id, value, onChange, type = 'text', disabled = false }) => (
    <div className="space-y-1.5">
      <label className="font-semibold text-sm text-on-surface-variant block" htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all disabled:bg-surface-container-low disabled:text-on-surface-variant disabled:cursor-not-allowed"
      />
    </div>
  );

  return (
    <div className="min-h-dvh bg-background pb-24">
      <TopBar showBack title="Account Settings" showRole={false} />

      <main className="pt-20 px-4 max-w-2xl mx-auto space-y-6">
        <div className="bg-white border border-[#F1F1F1] rounded-xl p-6 dry-shadow">
          <h2 className="font-semibold text-[24px] text-on-surface mb-6">Personal Details</h2>
          <form className="space-y-5" onSubmit={handleSave}>
            <Field
              label="Full Name"
              id="name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
            <Field
              label="Institution Email"
              id="email"
              value={form.email}
              type="email"
              disabled
              onChange={() => {}}
            />
            <Field
              label="Institution"
              id="institution"
              value={form.institution}
              onChange={e => setForm(f => ({ ...f, institution: e.target.value }))}
            />
            <Field
              label="Degree Program"
              id="degree"
              value={form.degree}
              onChange={e => setForm(f => ({ ...f, degree: e.target.value }))}
            />
            <button
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-surface-tint transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {saved ? (
                <><span className="material-symbols-outlined ms-fill text-[20px]">check_circle</span>Saved!</>
              ) : (
                'Save Changes'
              )}
            </button>
          </form>
        </div>

        <div className="bg-white border border-[#F1F1F1] rounded-xl p-6 dry-shadow">
          <h2 className="font-semibold text-[24px] text-on-surface mb-2">Security</h2>
          <p className="text-on-surface-variant text-sm mb-4">Manage your account security settings.</p>
          <div className="space-y-2">
            <button className="w-full text-left flex items-center gap-4 p-4 bg-surface-container-low rounded-lg hover:bg-surface-container transition-colors active:scale-[0.99]">
              <span className="material-symbols-outlined text-primary">lock_reset</span>
              <span className="font-semibold text-on-surface">Change Password</span>
              <span className="material-symbols-outlined text-on-surface-variant ml-auto">chevron_right</span>
            </button>
            <button className="w-full text-left flex items-center gap-4 p-4 bg-surface-container-low rounded-lg hover:bg-surface-container transition-colors active:scale-[0.99]">
              <span className="material-symbols-outlined text-primary">phone_android</span>
              <span className="font-semibold text-on-surface">Link Phone Number</span>
              <span className="material-symbols-outlined text-on-surface-variant ml-auto">chevron_right</span>
            </button>
          </div>
        </div>

        <div className="bg-white border border-[#F1F1F1] rounded-xl p-6 dry-shadow">
          <h2 className="font-semibold text-[18px] text-error mb-2">Danger Zone</h2>
          <button className="w-full py-3 border border-error text-error rounded-lg font-semibold hover:bg-red-50 transition-colors active:scale-[0.98]">
            Delete Account
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
