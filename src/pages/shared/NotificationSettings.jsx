import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import TopBar from '../../components/TopBar';
import BottomNav from '../../components/BottomNav';

const NOTIFICATION_GROUPS = [
  {
    group: 'Task Activity',
    items: [
      { key: 'taskUpdates', label: 'Task Status Updates', desc: 'Get notified when your task status changes' },
      { key: 'newApplicants', label: 'New Applicants', desc: 'When someone applies to your posted tasks' },
    ],
  },
  {
    group: 'Communication',
    items: [
      { key: 'messages', label: 'New Messages', desc: 'Chat messages from other students' },
    ],
  },
  {
    group: 'Payments',
    items: [
      { key: 'payments', label: 'Payment Updates', desc: 'Earnings credited and withdrawal confirmations' },
    ],
  },
  {
    group: 'Extras',
    items: [
      { key: 'promotions', label: 'Promotions & Tips', desc: 'Campus offers and productivity tips' },
      { key: 'emailDigest', label: 'Weekly Email Digest', desc: 'Summary of your weekly activity' },
    ],
  },
];

export default function NotificationSettings() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const { notifications } = state;

  return (
    <div className="min-h-dvh bg-background pb-24">
      <TopBar showBack title="Notification Settings" showRole={false} />

      <main className="pt-20 px-4 max-w-2xl mx-auto space-y-6">
        {NOTIFICATION_GROUPS.map(group => (
          <div key={group.group} className="bg-white border border-[#F1F1F1] rounded-xl overflow-hidden dry-shadow">
            <div className="px-6 py-3 bg-surface-container-low border-b border-[#F1F1F1]">
              <span className="font-semibold text-xs text-on-surface-variant uppercase tracking-wider">{group.group}</span>
            </div>
            {group.items.map((item, idx, arr) => (
              <div key={item.key} className={`flex items-center justify-between px-6 py-4 ${idx < arr.length - 1 ? 'border-b border-[#F1F1F1]' : ''}`}>
                <div>
                  <p className="font-semibold text-on-surface text-sm">{item.label}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_NOTIFICATION', payload: item.key })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ml-4 flex-shrink-0 ${notifications[item.key] ? 'bg-primary' : 'bg-zinc-300'}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${notifications[item.key] ? 'translate-x-6' : 'translate-x-1'}`}
                  />
                </button>
              </div>
            ))}
          </div>
        ))}

        <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 flex items-start gap-3">
          <span className="material-symbols-outlined text-primary">info</span>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            You can manage push notification permissions for PaidSheet in your device settings. Some critical notifications (like payments) cannot be disabled.
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
