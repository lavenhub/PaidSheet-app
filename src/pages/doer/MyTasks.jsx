import { useNavigate } from 'react-router-dom';
import { useApp, formatCurrency, timeAgo } from '../../context/AppContext';
import TopBar from '../../components/TopBar';
import BottomNav from '../../components/BottomNav';
import { StatusBadge } from '../../components/Badge';

export default function MyTasks() {
  const { state } = useApp();
  const navigate = useNavigate();

  // Doer's accepted tasks
  const myTasks = state.tasks.filter(t =>
    t.assignedDoerId === state.user.id || t.status === 'assigned' || t.status === 'pending_review'
  );

  return (
    <div className="min-h-dvh bg-background pb-24">
      <TopBar title="My Tasks" showLogo={false} showBack={false} showRole={false} />

      <main className="pt-20 px-4 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-bold text-[32px] text-on-surface">My Tasks</h1>
          <span className="font-semibold text-sm text-on-surface-variant">{myTasks.length} Active</span>
        </div>

        {myTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
            <span className="material-symbols-outlined text-[80px] text-zinc-200">assignment</span>
            <h3 className="font-semibold text-[24px] text-on-surface">No tasks yet</h3>
            <p className="text-on-surface-variant max-w-xs">Browse the task feed to find campus tasks near you.</p>
            <button onClick={() => navigate('/feed')} className="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-surface-tint transition-all active:scale-95">
              Browse Tasks
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {myTasks.map(task => (
              <div
                key={task.id}
                onClick={() => navigate(`/task/${task.id}/progress-doer`)}
                className="bg-white border border-[#F1F1F1] rounded-xl p-5 dry-shadow cursor-pointer hover:border-primary-container transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <StatusBadge status={task.status} />
                  <span className="font-bold text-primary text-lg">{formatCurrency(task.payout)}</span>
                </div>
                <h3 className="font-semibold text-[18px] text-on-surface mb-2">{task.title}</h3>
                <div className="flex items-center gap-4 text-on-surface-variant text-sm">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    {task.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    {timeAgo(task.postedAt)}
                  </div>
                </div>
                {task.status === 'assigned' && (
                  <button
                    onClick={e => { e.stopPropagation(); navigate(`/task/${task.id}/proof`); }}
                    className="mt-4 w-full bg-[#D9EAD3] text-primary py-2.5 rounded-lg font-semibold text-sm hover:bg-primary hover:text-white transition-colors active:scale-95"
                  >
                    Submit Proof
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
