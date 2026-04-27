import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp, formatCurrency } from '../../context/AppContext';
import FileUpload from '../../components/FileUpload';

export default function SubmitProof() {
  const { id } = useParams();
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const task = state.tasks.find(t => t.id === id) || state.tasks.find(t => t.status === 'assigned') || state.tasks[4];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!note.trim()) { setError('Please add a completion note.'); return; }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    dispatch({
      type: 'SUBMIT_PROOF',
      payload: {
        taskId: task?.id || id,
        proof: { note: note.trim(), photos: files.map(f => f.url), submittedAt: new Date().toISOString() },
      },
    });
    setLoading(false);
    navigate(`/task/${task?.id || id}/progress-doer`);
  };

  return (
    <div className="min-h-dvh bg-background text-on-surface">
      {/* TopBar */}
      <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 h-16 flex items-center px-4">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-gray-50 rounded-full transition-colors active:scale-95">
          <span className="material-symbols-outlined text-[#68B946]">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-[#68B946]">Submit Proof</h1>
      </header>

      <main className="pt-24 pb-32 px-4 max-w-2xl mx-auto">
        {/* Task Context */}
        {task && (
          <div className="bg-white border border-[#F1F1F1] p-4 rounded-lg mb-8 dry-shadow">
            <div className="flex justify-between items-start mb-2">
              <span className="bg-[#D9EAD3] text-[#236d00] px-3 py-1 rounded font-semibold text-sm">In Progress</span>
              <span className="text-primary font-bold text-[24px]">{formatCurrency(task.payout)}</span>
            </div>
            <h2 className="font-semibold text-[24px] text-on-surface mb-1">{task.title}</h2>
            <p className="text-secondary text-sm">{task.description}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Upload Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[24px]">Upload Proof</h3>
              <span className="font-semibold text-sm text-secondary">Up to 3 photos</span>
            </div>
            <FileUpload onFilesChange={setFiles} maxFiles={3} />
          </section>

          {/* Completion Note */}
          <section className="mb-12">
            <label className="block font-semibold text-[24px] mb-4" htmlFor="note">Completion Note</label>
            <div className="relative">
              <textarea
                id="note"
                value={note}
                onChange={e => { setNote(e.target.value); setError(''); }}
                placeholder="Describe where you left the item or any specific details for the requester..."
                rows={5}
                className={`w-full bg-white border rounded-lg p-4 focus:ring-0 focus:border-primary resize-none placeholder:text-[#A9A9A9] outline-none transition-all ${error ? 'border-error' : 'border-[#D9D9D9]'}`}
              />
              <div className="absolute bottom-3 right-3 text-xs text-secondary font-semibold">
                {note.length} / 500
              </div>
            </div>
            {error && <p className="text-error text-xs font-semibold mt-1">{error}</p>}
          </section>

          {/* Submit */}
          <div className="mt-12">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#68B946] hover:bg-primary text-white font-semibold text-[16px] h-14 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>Submit for Review<span className="material-symbols-outlined">send</span></>
              )}
            </button>
            <p className="text-center text-xs text-secondary mt-4 px-6">
              By submitting, you confirm that you have completed the task as per the requirements. Funds will be released once the requester approves the proof.
            </p>
          </div>
        </form>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full z-50 bg-white border-t border-gray-100 flex justify-around items-center h-20 pb-safe px-6">
        {[
          { icon: 'dashboard', label: 'Dashboard', to: '/feed' },
          { icon: 'assignment_turned_in', label: 'My Tasks', to: '/my-tasks', active: true },
          { icon: 'chat_bubble', label: 'Messages', to: '/messages' },
          { icon: 'person', label: 'Profile', to: '/profile' },
        ].map(item => (
          <button
            key={item.label}
            onClick={() => navigate(item.to)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg ${item.active ? 'text-[#68B946] bg-[#D9EAD3]' : 'text-zinc-400 hover:text-zinc-900'}`}
          >
            <span className={`material-symbols-outlined mb-1 ${item.active ? 'ms-fill' : ''}`}>{item.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
