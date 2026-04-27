import { useNavigate } from 'react-router-dom';
import { useApp, formatCurrency } from '../../context/AppContext';

export default function PostTaskSuccess() {
  const { state } = useApp();
  const navigate = useNavigate();
  const latestTask = state.tasks[0];

  return (
    <div className="min-h-dvh bg-background flex flex-col items-center justify-center px-4 py-12">
      {/* Success Illustration */}
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="w-24 h-24 rounded-full bg-[#D9EAD3] flex items-center justify-center mb-8">
          <span className="material-symbols-outlined text-primary ms-fill text-[48px]">check_circle</span>
        </div>
        <h1 className="text-[40px] font-bold text-on-surface mb-3">Task Posted!</h1>
        <p className="text-[18px] text-on-surface-variant mb-8">
          Your task is now live. Verified students near your campus will be able to apply immediately.
        </p>

        {latestTask && (
          <div className="w-full bg-white border border-[#F1F1F1] rounded-xl p-6 dry-shadow mb-8 text-left">
            <div className="flex justify-between items-start mb-3">
              <span className="bg-[#F1F1F1] text-zinc-500 px-2 py-0.5 rounded font-semibold text-xs uppercase">{latestTask.category}</span>
              <span className="font-bold text-primary text-lg">{formatCurrency(latestTask.payout)}</span>
            </div>
            <h3 className="font-semibold text-[18px] text-on-surface mb-2">{latestTask.title}</h3>
            <div className="flex items-center gap-2 text-on-surface-variant text-sm">
              <span className="material-symbols-outlined text-[16px]">location_on</span>
              <span>{latestTask.location}</span>
            </div>
          </div>
        )}

        {/* Stats row */}
        <div className="w-full grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: 'group', label: 'Applicants', value: '0' },
            { icon: 'schedule', label: 'Est. Time', value: '~15 min' },
            { icon: 'verified', label: 'Status', value: 'Live' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-[#F1F1F1] rounded-xl p-4 flex flex-col items-center text-center dry-shadow">
              <span className="material-symbols-outlined text-primary mb-2">{s.icon}</span>
              <span className="font-bold text-on-surface text-lg">{s.value}</span>
              <span className="text-xs text-on-surface-variant font-semibold">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="w-full flex flex-col gap-3">
          <button
            onClick={() => navigate('/asker')}
            className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-[16px] hover:bg-surface-tint transition-all active:scale-[0.98]"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => navigate('/post/details')}
            className="w-full bg-[#F1F1F1] text-on-surface py-4 rounded-xl font-semibold text-[16px] hover:bg-[#e2e2e2] transition-colors active:scale-[0.98]"
          >
            Post Another Task
          </button>
        </div>
      </div>
    </div>
  );
}
