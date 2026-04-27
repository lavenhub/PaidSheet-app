import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import TopBar from '../../components/TopBar';

const QUICK_AMOUNTS = [150, 300, 500, 800, 1200, 2000];

export default function PostTaskBudgetTiming() {
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const [payout, setPayout] = useState('');
  const [deadline, setDeadline] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!payout || isNaN(Number(payout)) || Number(payout) < 50) e.payout = 'Minimum payout is ₹50';
    if (!deadline) e.deadline = 'Please set a deadline';
    return e;
  };

  const handlePost = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }

    const step1 = JSON.parse(sessionStorage.getItem('draft_task_step1') || '{}');
    dispatch({
      type: 'ADD_TASK',
      payload: {
        ...step1,
        payout: Number(payout),
        deadline,
        urgent,
        distance: '0.5 km away',
      },
    });
    sessionStorage.removeItem('draft_task_step1');
    navigate('/post/success');
  };

  const minDate = new Date();
  minDate.setHours(minDate.getHours() + 1);
  const minStr = minDate.toISOString().slice(0, 16);

  return (
    <div className="min-h-dvh bg-background">
      <TopBar showBack title="Post a Task" showRole={false} showAvatar={false} />

      <main className="pt-24 pb-32 px-4 md:px-8 max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h1 className="text-[32px] font-bold text-on-surface">Budget & Timing</h1>
              <p className="text-on-surface-variant mt-1">Step 2 of 2: Set your offer</p>
            </div>
            <span className="font-semibold text-sm text-primary uppercase tracking-wider hidden md:block">100% Complete</span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full w-full bg-primary transition-all duration-500" />
          </div>
        </div>

        <div className="bg-white border border-outline-variant rounded-xl p-6 md:p-8 dry-shadow">
          <form className="space-y-6" onSubmit={handlePost}>
            {/* Payout */}
            <div className="space-y-2">
              <label className="font-semibold text-sm text-on-surface-variant block" htmlFor="payout">
                Task Payout (₹)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">₹</span>
                <input
                  id="payout"
                  type="number"
                  min="50"
                  value={payout}
                  onChange={e => { setPayout(e.target.value); setErrors(ev => ({ ...ev, payout: '' })); }}
                  placeholder="0"
                  className={`w-full bg-white border rounded-lg pl-8 pr-4 py-4 text-[24px] font-bold focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.payout ? 'border-error' : 'border-outline'}`}
                />
              </div>
              {errors.payout && <p className="text-error text-xs font-semibold">{errors.payout}</p>}

              {/* Quick select amounts */}
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_AMOUNTS.map(amt => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => { setPayout(String(amt)); setErrors(ev => ({ ...ev, payout: '' })); }}
                    className={`px-3 py-1.5 rounded-lg border font-semibold text-sm transition-all active:scale-95 ${Number(payout) === amt ? 'bg-[#D9EAD3] border-primary-container text-primary' : 'bg-white border-outline-variant text-on-surface-variant hover:bg-surface-container-low'}`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Deadline */}
            <div className="space-y-1.5">
              <label className="font-semibold text-sm text-on-surface-variant block" htmlFor="deadline">
                Task Deadline
              </label>
              <input
                id="deadline"
                type="datetime-local"
                min={minStr}
                value={deadline}
                onChange={e => { setDeadline(e.target.value); setErrors(ev => ({ ...ev, deadline: '' })); }}
                className={`w-full bg-white border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.deadline ? 'border-error' : 'border-outline'}`}
              />
              {errors.deadline && <p className="text-error text-xs font-semibold">{errors.deadline}</p>}
            </div>

            {/* Urgent toggle */}
            <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                  <span className="material-symbols-outlined text-red-600">bolt</span>
                </div>
                <div>
                  <p className="font-semibold text-on-surface">Mark as Urgent</p>
                  <p className="text-xs text-on-surface-variant">Gets priority visibility in the task feed</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setUrgent(u => !u)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${urgent ? 'bg-primary' : 'bg-zinc-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${urgent ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            {/* Preview */}
            <div className="p-4 bg-surface-container rounded-lg border border-outline-variant/30">
              <p className="font-semibold text-sm text-on-surface-variant uppercase tracking-wider mb-3">Task Summary</p>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-on-surface">Your payout offer</span>
                <span className="font-bold text-primary text-[20px]">₹{payout || '—'}</span>
              </div>
              {deadline && (
                <div className="flex justify-between items-center mt-2">
                  <span className="font-semibold text-on-surface">Deadline</span>
                  <span className="font-semibold text-on-surface-variant text-sm">
                    {new Date(deadline).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  </span>
                </div>
              )}
            </div>
          </form>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-on-surface-variant font-semibold hover:bg-surface-container rounded-lg px-4 py-3 transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back
          </button>
          <button
            onClick={handlePost}
            className="bg-primary text-on-primary font-semibold text-[16px] rounded-lg px-10 py-3 hover:bg-surface-tint green-shadow transition-all active:scale-[0.98] flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined ms-fill text-[20px]">check_circle</span>
            Post Task
          </button>
        </div>
      </main>
    </div>
  );
}
