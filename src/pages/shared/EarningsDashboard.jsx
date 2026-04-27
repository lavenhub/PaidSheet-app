import { useNavigate } from 'react-router-dom';
import { useApp, formatCurrency } from '../../context/AppContext';
import TopBar from '../../components/TopBar';
import BottomNav from '../../components/BottomNav';

export default function EarningsDashboard() {
  const { state } = useApp();
  const navigate = useNavigate();
  const { earnings } = state;

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxH = Math.max(...earnings.weeklyChart);

  return (
    <div className="min-h-dvh bg-background pb-24">
      <TopBar title="Earnings" showLogo={false} showBack={false} showRole={false} />

      <main className="pt-20 px-4 max-w-3xl mx-auto space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-primary text-white p-6 rounded-xl col-span-2">
            <p className="font-semibold text-xs uppercase tracking-wider text-white/80 mb-1">Total Earned</p>
            <p className="font-bold text-[40px]">{formatCurrency(earnings.total)}</p>
            <p className="text-white/70 text-sm mt-1">Across {earnings.completedCount} completed tasks</p>
          </div>
          <div className="bg-white border border-[#F1F1F1] p-5 rounded-xl dry-shadow">
            <p className="font-semibold text-xs text-on-surface-variant uppercase tracking-wider mb-2">Pending</p>
            <p className="font-bold text-[24px] text-on-surface">{formatCurrency(earnings.pending)}</p>
            <p className="text-xs text-secondary mt-1">Awaiting approval</p>
          </div>
          <div className="bg-white border border-[#F1F1F1] p-5 rounded-xl dry-shadow">
            <p className="font-semibold text-xs text-on-surface-variant uppercase tracking-wider mb-2">This Week</p>
            <p className="font-bold text-[24px] text-on-surface">{formatCurrency(earnings.thisWeek)}</p>
            <p className="text-xs text-green-600 font-semibold mt-1">↑ 18% vs last week</p>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white border border-[#F1F1F1] p-6 rounded-xl dry-shadow">
          <div className="flex justify-between items-end mb-6">
            <h3 className="font-semibold text-[18px] text-on-surface">Weekly Overview</h3>
            <span className="font-semibold text-xs text-on-surface-variant">This week</span>
          </div>
          <div className="flex items-end justify-between gap-2 h-32">
            {earnings.weeklyChart.map((val, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="w-full rounded-t-md bg-[#D9EAD3] relative overflow-hidden transition-all"
                  style={{ height: `${(val / maxH) * 100}%` }}
                >
                  <div
                    className="absolute bottom-0 w-full bg-primary rounded-t-md transition-all"
                    style={{ height: `${70}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase">{days[idx]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white border border-[#F1F1F1] rounded-xl dry-shadow overflow-hidden">
          <div className="p-6 border-b border-[#F1F1F1]">
            <h3 className="font-semibold text-[18px] text-on-surface">Transaction History</h3>
          </div>
          <div className="divide-y divide-[#F1F1F1]">
            {earnings.history.map(item => (
              <div key={item.id} className="p-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary flex-shrink-0">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-on-surface truncate">{item.title}</p>
                  <p className="text-xs text-on-surface-variant">{item.date} · {item.category}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`font-bold text-sm ${item.status === 'pending' ? 'text-yellow-600' : 'text-primary'}`}>
                    +{formatCurrency(item.amount)}
                  </p>
                  <p className="text-[10px] text-on-surface-variant uppercase font-semibold">{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Withdraw Button */}
        <button
          className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-[16px] hover:bg-surface-tint transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          onClick={() => navigate('/payment/success')}
        >
          <span className="material-symbols-outlined ms-fill">account_balance_wallet</span>
          Withdraw Earnings
        </button>
      </main>

      <BottomNav />
    </div>
  );
}
