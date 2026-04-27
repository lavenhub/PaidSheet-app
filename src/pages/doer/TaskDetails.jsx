import { useParams, useNavigate } from 'react-router-dom';
import { useApp, formatCurrency, timeAgo } from '../../context/AppContext';
import { StarRating } from '../../components/Badge';
import BottomNav from '../../components/BottomNav';

export default function TaskDetails() {
  const { id } = useParams();
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const task = state.tasks.find(t => t.id === id);
  if (!task) return (
    <div className="pt-24 px-4 text-center">
      <p className="text-on-surface-variant">Task not found.</p>
      <button onClick={() => navigate('/feed')} className="mt-4 text-primary font-semibold">Back to Feed</button>
    </div>
  );

  const asker = state.allUsers.find(u => u.id === task.askerId) || {
    name: task.askerName, avatar: task.askerAvatar, rating: 4.9, successRate: 98,
  };

  const handleAccept = () => {
    dispatch({ type: 'APPLY_TASK', payload: { taskId: task.id, userId: state.user.id } });
    dispatch({ type: 'HIRE_DOER', payload: { taskId: task.id, doerId: state.user.id, doerName: state.user.name } });
    navigate(`/task/${task.id}/progress-doer`);
  };

  return (
    <div className="min-h-dvh bg-background text-on-background pb-32">
      {/* TopBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 h-16 bg-white border-b border-[#F1F1F1] dry-shadow">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors active:scale-95">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="text-lg font-extrabold text-zinc-900 tracking-tighter">PaidSheet</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/feed')}
            className="font-semibold text-sm text-[#68B946] hover:bg-zinc-100 transition-colors active:scale-95 px-3 py-2 rounded-lg"
          >
            Switch Role
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant bg-surface-container">
            <img src={state.user.avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <main className="mt-20 px-4 max-w-4xl mx-auto space-y-6">
        {/* Hero */}
        <div className="bg-white border border-[#F1F1F1] p-6 rounded-xl space-y-3">
          <div className="flex justify-between items-start">
            <div className="space-y-1.5">
              <span className="bg-[#D9EAD3] text-primary px-3 py-1 rounded-lg font-semibold text-xs uppercase tracking-widest">
                {task.category}
                {task.urgent && ' · Urgent'}
              </span>
              <h2 className="text-[32px] font-bold text-on-background">{task.title}</h2>
            </div>
            <div className="text-right">
              <p className="text-xs text-on-surface-variant uppercase font-semibold">Payout</p>
              <p className="text-[24px] font-bold text-primary">{formatCurrency(task.payout)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left */}
          <div className="md:col-span-8 space-y-6">
            {/* Requirements */}
            <section className="bg-white border border-[#F1F1F1] p-6 rounded-xl space-y-4">
              <h3 className="font-semibold text-[24px] border-b border-[#F1F1F1] pb-2">Task Requirements</h3>
              <p className="text-on-surface-variant leading-relaxed">{task.description}</p>
              <ul className="space-y-2 pt-2">
                {(task.requirements || []).map(req => (
                  <li key={req} className="flex items-center gap-3 text-on-surface">
                    <span className="material-symbols-outlined text-primary text-sm ms-fill">check_circle</span>
                    {req}
                  </li>
                ))}
              </ul>
            </section>

            {/* Logistics */}
            <section className="bg-white border border-[#F1F1F1] overflow-hidden rounded-xl">
              <div className="p-6 space-y-4">
                <h3 className="font-semibold text-[24px]">Logistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary">location_on</span>
                    <div>
                      <p className="font-semibold text-xs text-on-surface-variant uppercase">Location</p>
                      <p className="font-semibold text-on-surface">{task.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary">schedule</span>
                    <div>
                      <p className="font-semibold text-xs text-on-surface-variant uppercase">Posted</p>
                      <p className="font-semibold text-on-surface">{timeAgo(task.postedAt)}</p>
                    </div>
                  </div>
                  {task.deadline && (
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-tertiary">event</span>
                      <div>
                        <p className="font-semibold text-xs text-on-surface-variant uppercase">Deadline</p>
                        <p className="font-semibold text-on-surface">
                          {new Date(task.deadline).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary">near_me</span>
                    <div>
                      <p className="font-semibold text-xs text-on-surface-variant uppercase">Distance</p>
                      <p className="font-semibold text-on-surface">{task.distance || 'On campus'}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Map placeholder */}
              <div className="h-48 w-full bg-surface-container relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=60"
                  alt="Campus map"
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute bottom-4 left-4 bg-white px-3 py-2 border border-[#F1F1F1] rounded dry-shadow">
                  <p className="font-semibold text-xs text-on-background">{task.location}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right */}
          <div className="md:col-span-4 space-y-6">
            {/* Asker Info */}
            <section className="bg-white border border-[#F1F1F1] p-6 rounded-xl space-y-6">
              <h3 className="font-semibold text-[24px]">About the Asker</h3>
              <div className="flex items-center gap-3">
                <img
                  src={task.askerAvatar}
                  alt={task.askerName}
                  className="w-12 h-12 rounded-full border border-[#F1F1F1] object-cover"
                  onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(task.askerName)}&background=ebf0e2&color=236d00`; }}
                />
                <div>
                  <p className="font-bold text-on-background">{task.askerName}</p>
                  <p className="font-semibold text-xs text-on-surface-variant">Verified Student</p>
                </div>
              </div>
              <div className="space-y-2 border-t border-[#F1F1F1] pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-xs text-on-surface-variant uppercase">Reliability</span>
                  <span className="font-bold text-primary">98%</span>
                </div>
                <div className="w-full bg-[#D9EAD3] h-1.5 rounded-full">
                  <div className="bg-primary h-1.5 w-[98%] rounded-full" />
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-xs text-on-surface-variant uppercase">Rating</span>
                  <StarRating rating={4.9} size="sm" />
                </div>
              </div>
              <button
                onClick={() => navigate(`/messages/${task.askerId}`)}
                className="w-full bg-secondary-container text-on-secondary-container font-semibold py-3 rounded-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">chat</span>
                Questions?
              </button>
            </section>

            {/* Viewers */}
            <div className="p-6 bg-surface-container-low rounded-xl border border-outline-variant space-y-1 text-center">
              <p className="font-semibold text-xs text-on-surface-variant uppercase tracking-widest">Active Listing</p>
              <p className="font-semibold text-[24px] text-on-background">3 Viewers</p>
              <p className="text-sm text-tertiary">Likely to be taken soon</p>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-[#F1F1F1] p-4 z-50">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleAccept}
            className="w-full bg-[#68B946] text-white font-semibold text-[16px] py-4 rounded-xl green-shadow hover:brightness-95 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined ms-fill">verified</span>
            Accept Task · {formatCurrency(task.payout)}
          </button>
        </div>
      </div>
    </div>
  );
}
