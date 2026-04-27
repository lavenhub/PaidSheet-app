// Badge for task status
export function StatusBadge({ status }) {
  const MAP = {
    open: { label: 'Open', cls: 'bg-blue-50 text-blue-700' },
    assigned: { label: 'Assigned', cls: 'bg-[#D9EAD3] text-primary' },
    pending_review: { label: 'Pending Review', cls: 'bg-yellow-50 text-yellow-700' },
    complete: { label: 'Complete', cls: 'bg-[#D9EAD3] text-primary' },
    disputed: { label: 'Disputed', cls: 'bg-red-50 text-error' },
  };
  const { label, cls } = MAP[status] || { label: status, cls: 'bg-[#F1F1F1] text-zinc-500' };
  return (
    <span className={`px-2 py-0.5 rounded text-[12px] font-bold uppercase tracking-wide ${cls}`}>
      {label}
    </span>
  );
}

// Verified student badge
export function VerifiedBadge({ small = false }) {
  return (
    <span className={`bg-[#D9EAD3] text-[#144500] font-label-sm px-2 py-0.5 rounded-full border border-[#c0cab6] ${small ? 'text-[11px]' : 'text-label-sm'}`}>
      VERIFIED STUDENT
    </span>
  );
}

// Reliability score pill
export function ReliabilityBadge({ score }) {
  const color = score >= 90 ? 'text-primary' : score >= 75 ? 'text-yellow-600' : 'text-error';
  return (
    <span className={`font-bold text-sm ${color}`}>{score}% Reliable</span>
  );
}

// Star rating display
export function StarRating({ rating, size = 'sm' }) {
  const sz = size === 'sm' ? 'text-[16px]' : 'text-[20px]';
  return (
    <div className="flex items-center gap-1 text-primary">
      <span className={`material-symbols-outlined ms-fill ${sz}`}>star</span>
      <span className="font-bold">{rating.toFixed(1)}</span>
    </div>
  );
}
