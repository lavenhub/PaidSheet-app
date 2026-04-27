import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import TopBar from '../../components/TopBar';
import BottomNav from '../../components/BottomNav';

const REASONS = [
  { value: 'incomplete', label: 'Work incomplete' },
  { value: 'quality', label: 'Quality issues' },
  { value: 'not_described', label: 'Not as described' },
  { value: 'no_show', label: 'Doer did not show up' },
  { value: 'other', label: 'Other' },
];

export default function RaiseDispute() {
  const { id } = useParams();
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const task = state.tasks.find(t => t.id === id) || state.tasks[5];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = {};
    if (!reason) e2.reason = 'Please select a reason';
    if (description.trim().length < 20) e2.description = 'Please provide at least 20 characters';
    if (Object.keys(e2).length) { setErrors(e2); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    dispatch({
      type: 'RAISE_DISPUTE',
      payload: { taskId: task?.id || id, taskTitle: task?.title || 'Task', reason, description: description.trim() },
    });
    setLoading(false);
    navigate('/disputes/d1');
  };

  return (
    <div className="min-h-dvh bg-background pb-24">
      <header className="bg-white border-b border-zinc-100 dry-shadow sticky top-0 z-50">
        <div className="flex justify-between items-center px-4 h-16 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-zinc-50 rounded transition-colors active:scale-95">
              <span className="material-symbols-outlined text-primary">arrow_back</span>
            </button>
            <h1 className="text-lg font-extrabold text-zinc-900 tracking-tight">Dispute Center</h1>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-zinc-100">
            <img src={state.user.avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8">
        <div className="mb-8">
          <h2 className="font-bold text-[32px] text-on-surface mb-2">Raise a Dispute</h2>
          <p className="text-on-surface-variant">Provide the details of your issue below. Our team will review your case within 48 hours.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-4 space-y-6">
            <div className="bg-white border border-outline-variant p-6 rounded-lg dry-shadow">
              <span className="material-symbols-outlined text-primary mb-4 block">info</span>
              <h3 className="font-semibold text-[24px] text-on-surface mb-3">Guidelines</h3>
              <ul className="space-y-3 text-sm text-on-surface-variant">
                {[
                  'Be specific about dates and deliverables.',
                  'Attach screenshots or PDF documents.',
                  'Keep communication professional.',
                ].map(tip => (
                  <li key={tip} className="flex gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary flex-shrink-0">check_circle</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {task && (
              <div className="bg-primary-container p-6 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-xs text-on-primary-container uppercase tracking-widest mb-2">Task ID</h4>
                <p className="font-semibold text-[24px] text-on-primary-container">#{task.id.toUpperCase()}</p>
                <p className="text-on-primary-container/80 text-sm mt-1">{task.title}</p>
              </div>
            )}
          </aside>

          {/* Form */}
          <div className="md:col-span-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="bg-white border border-outline-variant p-8 rounded-lg dry-shadow space-y-6">
                {/* Reason */}
                <div className="space-y-2">
                  <label className="font-semibold text-sm text-on-surface block" htmlFor="reason">Reason for Dispute</label>
                  <div className="relative">
                    <select
                      id="reason"
                      value={reason}
                      onChange={e => { setReason(e.target.value); setErrors(ev => ({ ...ev, reason: '' })); }}
                      className={`w-full h-12 bg-white border rounded-lg px-4 appearance-none focus:ring-1 focus:ring-primary focus:border-primary outline-none ${errors.reason ? 'border-error' : 'border-outline-variant'}`}
                    >
                      <option value="">Select a reason</option>
                      {REASONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                      <span className="material-symbols-outlined">expand_more</span>
                    </div>
                  </div>
                  {errors.reason && <p className="text-error text-xs font-semibold">{errors.reason}</p>}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="font-semibold text-sm text-on-surface block" htmlFor="description">Detailed Description</label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={e => { setDescription(e.target.value); setErrors(ev => ({ ...ev, description: '' })); }}
                    rows={5}
                    placeholder="Explain the situation in detail..."
                    className={`w-full bg-white border rounded-lg p-4 focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-outline-variant outline-none resize-none ${errors.description ? 'border-error' : 'border-outline-variant'}`}
                  />
                  {errors.description && <p className="text-error text-xs font-semibold">{errors.description}</p>}
                </div>

                {/* Evidence Upload */}
                <div className="space-y-2">
                  <label className="font-semibold text-sm text-on-surface block">Upload Evidence</label>
                  <label className="border-2 border-dashed border-outline-variant rounded-lg p-8 flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer group">
                    <input type="file" multiple className="hidden" accept="image/*,.pdf" onChange={e => setFiles(Array.from(e.target.files))} />
                    <span className="material-symbols-outlined text-outline text-[48px] mb-2 group-hover:text-primary transition-colors">cloud_upload</span>
                    <p className="font-semibold text-on-surface">Click to upload or drag and drop</p>
                    <p className="text-xs text-on-surface-variant mt-1">PNG, JPG or PDF (max. 10MB)</p>
                  </label>
                  {files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {files.map(f => (
                        <div key={f.name} className="flex items-center gap-2 bg-surface-container border border-outline-variant rounded px-2 py-1.5">
                          <span className="material-symbols-outlined text-primary text-sm">image</span>
                          <span className="text-xs font-semibold truncate max-w-[120px]">{f.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end border-t border-zinc-100 pt-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-8 py-3 bg-secondary-fixed text-on-secondary-fixed font-semibold rounded hover:bg-secondary-fixed-dim transition-colors h-12 flex items-center justify-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-primary text-white font-semibold rounded hover:bg-surface-tint transition-colors h-12 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                  ) : (
                    <>Submit Dispute<span className="material-symbols-outlined text-[20px]">send</span></>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-6 py-3 bg-white border-t border-zinc-100">
        {[
          { icon: 'dashboard', label: 'Dashboard', to: '/asker' },
          { icon: 'gavel', label: 'Disputes', to: '/disputes/d1', active: true },
          { icon: 'account_circle', label: 'Profile', to: '/profile' },
        ].map(item => (
          <button
            key={item.label}
            onClick={() => navigate(item.to)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg ${item.active ? 'text-primary bg-zinc-50' : 'text-zinc-400 hover:text-primary'} transition-all`}
          >
            <span className={`material-symbols-outlined ${item.active ? 'ms-fill' : ''}`}>{item.icon}</span>
            <span className="text-[11px] font-bold uppercase tracking-wider mt-1">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
