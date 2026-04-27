import { useParams, useNavigate } from 'react-router-dom';
import { useApp, formatCurrency } from '../../context/AppContext';
import { StarRating, VerifiedBadge } from '../../components/Badge';
import TopBar from '../../components/TopBar';

export default function ApplicantReview() {
  const { id } = useParams();
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const task = state.tasks.find(t => t.id === id) || state.myPostedTasks[0];
  const allUsers = state.allUsers;

  // Use mock applicants if none applied yet (demo)
  const applicants = allUsers.slice(0, 3);

  const handleHire = (user) => {
    dispatch({ type: 'HIRE_DOER', payload: { taskId: id || state.myPostedTasks[0]?.id, doerId: user.id, doerName: user.name } });
    navigate(`/task/${id || 'at1'}/progress-asker`);
  };

  if (!task) return <div className="pt-24 px-4 text-center text-on-surface-variant">Task not found.</div>;

  return (
    <div className="min-h-dvh bg-background pb-24">
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-[#F1F1F1] h-16 flex items-center justify-between px-4 dry-shadow">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#F1F1F1] rounded-full active:scale-95">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold text-on-surface">Applicant Review</h1>
        </div>
        <button className="p-2 hover:bg-[#F1F1F1] rounded-full active:scale-95">
          <span className="material-symbols-outlined">tune</span>
        </button>
      </header>

      <main className="pt-20 px-4 max-w-2xl mx-auto">
        {/* Task Context */}
        <section className="mb-8">
          <div className="bg-white border border-[#F1F1F1] p-6 rounded-xl dry-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="bg-[#D9EAD3] text-[#236d00] font-semibold text-sm px-2 py-1 rounded-lg uppercase tracking-wider mb-2 inline-block">
                  {task.urgent ? 'Urgent Task' : task.category}
                </span>
                <h2 className="font-semibold text-[24px] text-on-background">{task.title}</h2>
                <p className="text-on-surface-variant text-sm">{task.location}</p>
              </div>
              <div className="text-right">
                <span className="font-semibold text-[24px] text-primary">{formatCurrency(task.payout)}</span>
                <p className="font-semibold text-xs text-secondary">Est. 20 min</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex -space-x-2">
                {applicants.slice(0, 3).map(u => (
                  <img key={u.id} src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <span className="font-semibold text-sm text-secondary">{applicants.length} Students Applied</span>
            </div>
          </div>
        </section>

        {/* Applicants */}
        <div className="space-y-4">
          {applicants.map(user => (
            <article key={user.id} className="bg-white border border-[#F1F1F1] rounded-xl overflow-hidden hover:dry-shadow transition-shadow">
              <div className="p-6">
                <div className="flex gap-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-20 h-20 rounded-lg object-cover"
                      onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&size=80&background=ebf0e2&color=236d00`; }}
                    />
                    <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px] ms-fill">verified</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-[20px] text-on-background leading-none mb-2">{user.name}</h3>
                        <VerifiedBadge small />
                      </div>
                      <div className="text-right">
                        <StarRating rating={user.rating} />
                        <span className="font-semibold text-[12px] text-secondary">{user.successRate}% Success</span>
                      </div>
                    </div>
                    <p className="font-body-md text-on-surface-variant italic text-sm mt-3 line-clamp-2">"{user.bio}"</p>
                  </div>
                </div>
              </div>
              <div className="flex border-t border-[#F1F1F1]">
                <button
                  onClick={() => navigate(`/profile/${user.id}`)}
                  className="flex-1 font-semibold text-[16px] py-4 text-secondary hover:bg-[#F1F1F1] transition-colors border-r border-[#F1F1F1]"
                >
                  View Profile
                </button>
                <button
                  onClick={() => handleHire(user)}
                  className="flex-[1.5] font-semibold text-[16px] py-4 bg-primary text-white hover:bg-[#195200] transition-colors"
                >
                  Hire {user.name.split(' ')[0]}
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full h-20 z-50 flex justify-around items-center px-4 bg-white border-t border-[#F1F1F1] font-semibold text-[11px] uppercase tracking-wider">
        {[
          { to: '/asker', icon: 'storefront', label: 'Marketplace' },
          { to: '/asker', icon: 'assignment_turned_in', label: 'My Tasks', active: true },
          { to: '/messages', icon: 'chat_bubble', label: 'Messages' },
          { to: '/profile', icon: 'person', label: 'Profile' },
        ].map(item => (
          <button
            key={item.label}
            onClick={() => navigate(item.to)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-all ${item.active ? 'text-[#68B946] bg-[#D9EAD3]' : 'text-zinc-400 hover:text-zinc-900'}`}
          >
            <span className={`material-symbols-outlined mb-1 ${item.active ? 'ms-fill' : ''}`}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
