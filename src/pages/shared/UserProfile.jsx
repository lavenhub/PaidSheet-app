import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, formatCurrency } from '../../context/AppContext';
import TopBar from '../../components/TopBar';
import BottomNav from '../../components/BottomNav';
import { StarRating, VerifiedBadge, ReliabilityBadge } from '../../components/Badge';

export default function UserProfile() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const { user, earnings } = state;
  const [tab, setTab] = useState('stats');

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('paidsheet_state');
    navigate('/');
  };

  return (
    <div className="min-h-dvh bg-background pb-24">
      <TopBar title="Profile" showLogo={false} showBack={false} showRole={false} />

      <main className="pt-20 px-4 max-w-3xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="bg-white border border-[#F1F1F1] rounded-xl p-6 dry-shadow">
          <div className="flex items-center gap-5 mb-6">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-primary-container"
                onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&size=96&background=68b946&color=fff`; }}
              />
              {user.verified && (
                <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1.5 rounded-full border-2 border-white">
                  <span className="material-symbols-outlined text-[14px] ms-fill">verified</span>
                </div>
              )}
            </div>
            <div>
              <h1 className="font-bold text-[24px] text-on-surface mb-1">{user.name}</h1>
              <VerifiedBadge small />
              <p className="text-on-surface-variant text-sm mt-1">{user.institution}</p>
              <p className="text-on-surface-variant text-sm">{user.degree} · {user.gradYear}</p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 border-t border-[#F1F1F1] pt-6">
            <div className="text-center">
              <p className="font-bold text-[24px] text-on-surface">{user.completedTasks}</p>
              <p className="text-xs text-on-surface-variant font-semibold uppercase">Tasks Done</p>
            </div>
            <div className="text-center border-x border-[#F1F1F1]">
              <StarRating rating={user.rating} />
              <p className="text-xs text-on-surface-variant font-semibold uppercase mt-1">Rating</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-[24px] text-primary">{user.reliabilityScore}%</p>
              <p className="text-xs text-on-surface-variant font-semibold uppercase">Reliability</p>
            </div>
          </div>

          {/* Reliability Bar */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-xs text-on-surface-variant uppercase">Reliability Score</span>
              <span className="font-bold text-primary text-sm">{user.reliabilityScore}%</span>
            </div>
            <div className="w-full h-2 bg-[#D9EAD3] rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${user.reliabilityScore}%` }} />
            </div>
          </div>
        </div>

        {/* Earnings Card */}
        <div className="bg-primary text-white rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className="text-white/80 text-xs font-semibold uppercase tracking-wider mb-1">Total Earned</p>
            <p className="font-bold text-[32px]">{formatCurrency(earnings.total)}</p>
          </div>
          <button
            onClick={() => navigate('/earnings')}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors active:scale-95"
          >
            View All
          </button>
        </div>

        {/* Badges */}
        <div className="bg-white border border-[#F1F1F1] rounded-xl p-6 dry-shadow">
          <h3 className="font-semibold text-sm text-on-surface-variant uppercase tracking-wider mb-4">Achievements</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: 'verified', label: 'Verified Student', color: 'text-primary' },
              { icon: 'star', label: 'Top Rated', color: 'text-yellow-500' },
              { icon: 'flash_on', label: 'Fast Responder', color: 'text-blue-500' },
              { icon: 'workspace_premium', label: 'Elite Doer', color: 'text-purple-600' },
            ].map(badge => (
              <div key={badge.label} className="flex items-center gap-2 bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2">
                <span className={`material-symbols-outlined text-[18px] ms-fill ${badge.color}`}>{badge.icon}</span>
                <span className="font-semibold text-xs text-on-surface">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Links */}
        <div className="bg-white border border-[#F1F1F1] rounded-xl overflow-hidden dry-shadow">
          {[
            { icon: 'settings', label: 'Account Settings', to: '/settings' },
            { icon: 'notifications', label: 'Notification Preferences', to: '/settings/notifications' },
            { icon: 'help', label: 'Help & Support', to: '#' },
            { icon: 'shield', label: 'Privacy Policy', to: '#' },
          ].map((item, idx, arr) => (
            <button
              key={item.label}
              onClick={() => navigate(item.to)}
              className={`w-full flex items-center gap-4 px-6 py-4 hover:bg-surface-container-low transition-colors text-left ${idx < arr.length - 1 ? 'border-b border-[#F1F1F1]' : ''}`}
            >
              <span className="material-symbols-outlined text-on-surface-variant">{item.icon}</span>
              <span className="flex-1 font-semibold text-on-surface">{item.label}</span>
              <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-4 border border-error text-error rounded-xl font-semibold hover:bg-red-50 transition-colors active:scale-[0.98]"
        >
          Sign Out
        </button>
      </main>

      <BottomNav />
    </div>
  );
}
