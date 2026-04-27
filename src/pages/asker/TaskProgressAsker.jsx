import { useParams, useNavigate } from 'react-router-dom';
import { useApp, formatCurrency, timeAgo } from '../../context/AppContext';
import TopBar from '../../components/TopBar';
import BottomNav from '../../components/BottomNav';
import { StatusBadge } from '../../components/Badge';

const STEPS = ['Task Posted', 'Doer Assigned', 'In Progress', 'Proof Submitted', 'Complete'];

function stepFromStatus(status) {
  if (status === 'open') return 0;
  if (status === 'assigned') return 2;
  if (status === 'pending_review') return 3;
  if (status === 'complete') return 4;
  return 1;
}

export default function TaskProgressAsker() {
  const { id } = useParams();
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const task = state.tasks.find(t => t.id === id) || state.tasks.find(t => t.status === 'pending_review') || state.tasks[4];
  if (!task) return <div className="pt-24 px-4 text-center">Task not found.</div>;

  const currentStep = stepFromStatus(task.status);
  const doer = state.allUsers.find(u => u.id === task.assignedDoerId) || state.allUsers[0];

  const handleApprove = () => {
    dispatch({ type: 'APPROVE_TASK', payload: task.id });
    navigate('/payment/success');
  };

  const handleDispute = () => navigate(`/task/${task.id}/dispute`);

  return (
    <div className="min-h-dvh bg-background pb-24">
      <TopBar showBack title="Task Progress" />

      <main className="pt-20 px-4 max-w-3xl mx-auto space-y-6">
        {/* Task header */}
        <div className="bg-white border border-[#F1F1F1] p-6 rounded-xl dry-shadow">
          <div className="flex justify-between items-start mb-3">
            <div>
              <StatusBadge status={task.status} />
              <h2 className="font-semibold text-[24px] text-on-surface mt-2">{task.title}</h2>
              <p className="text-on-surface-variant text-sm">{task.location}</p>
            </div>
            <span className="font-bold text-primary text-[24px]">{formatCurrency(task.payout)}</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white border border-[#F1F1F1] p-6 rounded-xl dry-shadow">
          <h3 className="font-semibold text-sm text-on-surface-variant uppercase tracking-wider mb-6">Task Timeline</h3>
          <div className="space-y-4">
            {STEPS.map((step, idx) => (
              <div key={step} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${idx <= currentStep ? 'bg-primary' : 'bg-surface-container-high'}`}>
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
                  {idx < currentStep && <p className="text-xs text-on-surface-variant">Completed</p>}
                  {idx === currentStep && <p className="text-xs text-primary font-semibold">Current</p>}
                </div>
                {idx <= currentStep && (
                  <span className="material-symbols-outlined text-primary ms-fill text-[20px]">check_circle</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Doer */}
        {doer && (
          <div className="bg-white border border-[#F1F1F1] p-6 rounded-xl dry-shadow">
            <h3 className="font-semibold text-sm text-on-surface-variant uppercase tracking-wider mb-4">Assigned Doer</h3>
            <div className="flex items-center gap-4">
              <img
                src={doer.avatar}
                alt={doer.name}
                className="w-14 h-14 rounded-full border border-outline-variant object-cover"
                onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doer.name)}&background=ebf0e2&color=236d00`; }}
              />
              <div className="flex-1">
                <p className="font-semibold text-on-surface text-lg">{doer.name}</p>
                <p className="text-sm text-on-surface-variant">{doer.successRate}% success · ⭐ {doer.rating}</p>
              </div>
              <button
                onClick={() => navigate(`/messages/${doer.id}`)}
                className="flex items-center gap-2 px-4 py-2 bg-secondary-container text-on-secondary-container rounded-lg font-semibold text-sm hover:bg-zinc-200 transition-colors active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                Message
              </button>
            </div>
          </div>
        )}

        {/* Proof Section (visible when pending_review) */}
        {task.status === 'pending_review' && task.proof && (
          <div className="bg-white border border-[#F1F1F1] p-6 rounded-xl dry-shadow">
            <h3 className="font-semibold text-sm text-on-surface-variant uppercase tracking-wider mb-4">Submitted Proof</h3>
            <div className="bg-surface-container-low rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary">note</span>
                <span className="font-semibold text-on-surface text-sm">Completion Note</span>
              </div>
              <p className="text-on-surface-variant text-sm">{task.proof.note}</p>
            </div>
            <p className="text-xs text-on-surface-variant mb-6">
              Submitted {timeAgo(task.proof.submittedAt)} · Review and approve to release payment.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDispute}
                className="flex-1 py-4 border border-error text-error rounded-lg font-semibold hover:bg-red-50 transition-colors active:scale-95"
              >
                Raise Dispute
              </button>
              <button
                onClick={handleApprove}
                className="flex-[2] py-4 bg-primary text-white rounded-lg font-semibold hover:bg-surface-tint transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined ms-fill">check_circle</span>
                Approve & Release ₹{task.payout}
              </button>
            </div>
          </div>
        )}

        {task.status === 'complete' && (
          <div className="bg-[#D9EAD3] border border-primary-container rounded-xl p-6 text-center">
            <span className="material-symbols-outlined text-primary text-[40px] ms-fill mb-3 block">check_circle</span>
            <h3 className="font-bold text-on-surface text-lg mb-1">Task Complete!</h3>
            <p className="text-on-surface-variant text-sm">Payment of {formatCurrency(task.payout)} has been released.</p>
            <button
              onClick={() => navigate(`/task/${task.id}/rate`)}
              className="mt-4 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-surface-tint transition-all active:scale-95"
            >
              Rate Your Doer
            </button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
