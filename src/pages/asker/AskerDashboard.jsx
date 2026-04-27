import { useNavigate } from 'react-router-dom';
import { useApp, formatCurrency, timeAgo } from '../../context/AppContext';
import TopBar from '../../components/TopBar';
import BottomNav from '../../components/BottomNav';
import { StatusBadge } from '../../components/Badge';

export default function AskerDashboard() {
  const { state } = useApp();
  const navigate = useNavigate();
  const { myPostedTasks, askerHistory, user } = state;

  const activeTasks = myPostedTasks.filter(t => t.status !== 'complete');
  const spent = askerHistory.reduce((s, h) => s + h.paid, 0);

  return (
    <div className="min-h-dvh bg-surface text-on-background pb-20">
      <TopBar />

      <main className="max-w-7xl mx-auto px-4 pt-24 md:px-8">
        {/* Welcome Header */}
        <header className="mb-12">
          <h1 className="text-[40px] font-bold text-on-surface mb-1">Asker Dashboard</h1>
          <p className="text-on-surface-variant">Manage your campus tasks and find the right help.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Tasks */}
          <div className="lg:col-span-8 space-y-6">
            {/* CTA Banner */}
            <section className="bg-primary text-on-primary p-12 rounded-xl flex flex-col md:flex-row justify-between items-center gap-6 border border-primary">
              <div>
                <h2 className="text-[24px] font-semibold mb-1 text-white">Need something done?</h2>
                <p className="text-white/90">Post a task and reach verified students instantly.</p>
              </div>
              <button
                onClick={() => navigate('/post/details')}
                className="bg-white text-primary px-10 py-6 rounded-lg font-semibold text-[16px] hover:bg-surface-container-lowest transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap"
              >
                <span className="material-symbols-outlined ms-fill">add_box</span>
                Post New Task
              </button>
            </section>

            {/* Active Tasks */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[32px] font-bold">Active Tasks</h2>
                <span className="bg-surface-container-high px-3 py-1 rounded-full font-semibold text-sm text-on-surface-variant">
                  {activeTasks.length} Running
                </span>
              </div>

              {activeTasks.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-secondary-container rounded-xl p-12 text-center">
                  <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-4 block">assignment</span>
                  <p className="font-semibold text-on-surface-variant">No active tasks. Post one to get started!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeTasks.map(task => (
                    <div
                      key={task.id}
                      onClick={() => navigate(task.status === 'open' ? `/task/${task.id}/applicants` : `/task/${task.id}/progress-asker`)}
                      className="bg-white border border-secondary-container rounded-xl p-6 flex flex-col gap-3 hover:dry-shadow transition-shadow cursor-pointer"
                    >
                      <div className="flex justify-between items-start">
                        <span className={`px-2 py-0.5 rounded text-[12px] font-bold uppercase tracking-wide ${task.category === 'Academic' ? 'bg-[#D9EAD3] text-on-primary-container' : 'bg-secondary-container text-on-secondary-container'}`}>
                          {task.category}
                        </span>
                        <span className="text-on-surface font-bold text-lg">{formatCurrency(task.payout)}</span>
                      </div>
                      <h3 className="font-semibold text-[18px] text-on-surface line-clamp-2">{task.title}</h3>
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        {task.status === 'open' ? (
                          <><span className="material-symbols-outlined text-[18px]">group</span>
                          <span className="font-semibold text-sm">{task.applicantsCount || 0} Applicants</span></>
                        ) : (
                          <><span className="material-symbols-outlined text-[18px] text-primary ms-fill">check_circle</span>
                          <span className="font-semibold text-sm text-primary">Assigned: {task.assignedDoerName}</span></>
                        )}
                      </div>
                      <StatusBadge status={task.status} />
                      {/* Progress bar */}
                      <div className="flex gap-1 mt-1">
                        <div className={`h-1.5 flex-1 rounded-full ${task.status !== 'open' ? 'bg-primary' : 'bg-secondary-container'}`} />
                        <div className={`h-1.5 flex-1 rounded-full ${task.status === 'complete' ? 'bg-primary' : 'bg-secondary-container'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Recent History */}
            <section>
              <h2 className="text-[32px] font-bold mb-6">Recent History</h2>
              <div className="bg-white border border-secondary-container rounded-xl divide-y divide-secondary-container">
                {askerHistory.map(item => (
                  <div key={item.id} className="p-6 flex items-center justify-between hover:bg-zinc-50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-surface-container-low rounded-lg flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[28px]">{item.icon}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-[16px] text-on-surface">{item.title}</p>
                        <p className="text-sm text-on-surface-variant">Completed {item.date} · Paid {formatCurrency(item.paid)}</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Stats */}
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-white border border-secondary-container rounded-xl p-6">
              <h3 className="font-semibold text-sm uppercase text-on-surface-variant mb-6 tracking-wider">Your Impact</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-secondary-container pb-6">
                  <div>
                    <p className="text-on-surface-variant">Tasks Completed</p>
                    <p className="text-[32px] font-bold text-on-surface">{askerHistory.length + activeTasks.filter(t => t.status === 'complete').length}</p>
                  </div>
                  <div className="text-green-600 font-bold mb-1">+2 this week</div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-on-surface-variant">Total Spent</p>
                    <p className="text-[32px] font-bold text-on-surface">{formatCurrency(spent)}</p>
                  </div>
                  <div className="text-on-surface-variant font-semibold mb-1">Avg. {formatCurrency(Math.round(spent / Math.max(askerHistory.length, 1)))}/task</div>
                </div>
              </div>
            </section>

            <div className="bg-surface-container-high rounded-xl p-6 border border-outline-variant">
              <h4 className="font-semibold text-[18px] text-on-surface mb-2">Fast Matching Tip</h4>
              <p className="text-sm text-on-surface-variant">Tasks with clear descriptions get 2.5× more applicants. Be specific!</p>
            </div>

            <div className="border-2 border-dashed border-secondary-container rounded-xl p-12 flex flex-col items-center justify-center text-center opacity-70">
              <span className="material-symbols-outlined text-[36px] text-on-surface-variant mb-6">drafts</span>
              <p className="font-semibold text-sm text-on-surface-variant">Saved Drafts (0)</p>
              <p className="text-xs text-on-surface-variant mt-1">Drafts will appear here</p>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
