import { useNavigate } from 'react-router-dom';
import { formatCurrency, timeAgo } from '../context/AppContext';

const CATEGORY_COLORS = {
  Academic: 'bg-blue-50 text-blue-700',
  Errand: 'bg-orange-50 text-orange-700',
  Tech: 'bg-purple-50 text-purple-700',
  Events: 'bg-pink-50 text-pink-700',
  Labor: 'bg-yellow-50 text-yellow-700',
};

export default function TaskCard({ task, onClick }) {
  const navigate = useNavigate();
  const catColor = CATEGORY_COLORS[task.category] || 'bg-[#F1F1F1] text-zinc-500';

  const handleClick = () => {
    if (onClick) { onClick(task); return; }
    navigate(`/task/${task.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white border border-[#F1F1F1] rounded-xl p-4 dry-shadow hover:border-primary-container transition-colors cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded font-label-sm text-[12px] uppercase ${catColor}`}>
            {task.category}
          </span>
          {task.urgent && (
            <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded font-label-sm text-[11px] uppercase">
              Urgent
            </span>
          )}
        </div>
        <span className="text-primary font-bold text-lg">{formatCurrency(task.payout)}</span>
      </div>
      <h3 className="font-semibold text-[18px] text-zinc-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
        {task.title}
      </h3>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-zinc-500">
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">location_on</span>
          <span className="font-label-sm text-[13px]">{task.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">schedule</span>
          <span className="font-label-sm text-[13px]">{timeAgo(task.postedAt)}</span>
        </div>
        {task.distance && (
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">near_me</span>
            <span className="font-label-sm text-[13px]">{task.distance}</span>
          </div>
        )}
      </div>
    </div>
  );
}
