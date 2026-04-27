import { useParams, useNavigate } from 'react-router-dom';
import { useApp, formatCurrency } from '../../context/AppContext';
import TopBar from '../../components/TopBar';
import BottomNav from '../../components/BottomNav';
import { StatusBadge } from '../../components/Badge';

const STEPS = ['Task Accepted', 'En Route', 'Task In Progress', 'Submit Proof'];

export default function TaskProgressDoer() {
  const { id } = useParams();
  const { state } = useApp();
  const navigate = useNavigate();

  const task = state.tasks.find(t => t.id === id) || state.tasks.find(t => t.status === 'assigned') || state.tasks[4];
  if (!task) return <div className="pt-24 px-4 text-center text-on-surface-variant">Task not found.</div>;

  const currentStep = task.status === 'assigned' ? 2 : task.status === 'pending_review' ? 3 : 0;

  return (
    <div className="min-h-dvh bg-background pb-24">
      <TopBar showBack title="My Task" />

      <main className="pt-20 px-4 max-w-2xl mx-auto space-y-6">
        {/* Task header */}
        <div className="bg-white border border-[#F1F1F1] p-6 rounded-xl dry-shadow">
          <div className="flex justify-between items-start mb-3">
            <div className="space-y-1">
              <StatusBadge status={task.status} />
              <h2 className="font-bold text-[24px] text-on-surface">{task.title}</h2>
              <p className="text-on-surface-variant text-sm">{task.location}</p>
            </div>
            <span className="font-bold text-primary text-[24px]">{formatCurrency(task.payout)}</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white border border-[#F1F1F1] p-6 rounded-xl dry-shadow">
          <h3 className="font-semibold text-sm text-on-surface-variant uppercase tracking-wider mb-6">Progress</h3>
          <div className="space-y-4">
            {STEPS.map((step, idx) => (
              <div key={step} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${idx <= currentStep ? 'bg-primary' : 'bg-surface-container-high'}`}>
                  {idx < currentStep ? (
                    <span className="material-symbols-outlined text-white text-[16px] ms-fill">check</span>
                  ) : idx === currentStep ? (
                    <div className="w-3 h-3 rounded-full bg-white" />
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-outline-variant" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-semibold text-sm ${idx <= currentStep ? 'text-on-surface' : 'text-on-surface-variant'}`}>{step}</p>
                  {idx < currentStep && <p className="text-xs text-primary font-semibold">Done</p>}
                  {idx === currentStep && <p className="text-xs text-primary font-semibold">Now</p>}
                </div>
                {idx <= currentStep && (
                  <span className="material-symbols-outlined text-primary ms-fill text-[20px]">check_circle</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Task Requirements quick view */}
        <div className="bg-white border border-[#F1F1F1] p-6 rounded-xl dry-shadow">
          <h3 className="font-semibold text-sm text-on-surface-variant uppercase tracking-wider mb-3">Requirements</h3>
          <ul className="space-y-2">
            {(task.requirements || []).map(req => (
              <li key={req} className="flex items-start gap-3 text-sm text-on-surface">
                <span className="material-symbols-outlined text-primary text-[16px] mt-0.5">radio_button_unchecked</span>
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Asker contact */}
        <div className="bg-white border border-[#F1F1F1] p-6 rounded-xl dry-shadow flex items-center gap-4">
          <img
            src={task.askerAvatar}
            alt={task.askerName}
            className="w-12 h-12 rounded-full border border-outline-variant object-cover"
            onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(task.askerName)}&background=ebf0e2&color=236d00`; }}
          />
          <div className="flex-1">
            <p className="font-semibold text-on-surface">{task.askerName}</p>
            <p className="text-xs text-on-surface-variant">Task Requester</p>
          </div>
          <button
            onClick={() => navigate(`/messages/${task.askerId}`)}
            className="flex items-center gap-2 px-4 py-2 bg-secondary-container text-on-secondary-container rounded-lg font-semibold text-sm hover:bg-zinc-200 transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            Chat
          </button>
        </div>

        {/* CTA */}
        {task.status === 'assigned' && (
          <button
            onClick={() => navigate(`/task/${task.id}/proof`)}
            className="w-full bg-[#68B946] text-white py-5 rounded-xl font-semibold text-[16px] green-shadow hover:brightness-95 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined ms-fill">upload_file</span>
            Submit Completion Proof
          </button>
        )}

        {task.status === 'pending_review' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
            <span className="material-symbols-outlined text-yellow-600 text-[36px] mb-2 block">hourglass_top</span>
            <p className="font-bold text-on-surface mb-1">Proof Under Review</p>
            <p className="text-on-surface-variant text-sm">Waiting for the requester to approve your submission.</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
