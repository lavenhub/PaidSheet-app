import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, formatCurrency } from '../../context/AppContext';
import TopBar from '../../components/TopBar';
import BottomNav from '../../components/BottomNav';
import TaskCard from '../../components/TaskCard';

const CATEGORIES = ['All', 'Academic', 'Errand', 'Tech', 'Events', 'Labor'];
const SORTS = ['Newest First', 'Highest Payout', 'Nearest'];

export default function DoerTaskFeed() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('Newest First');
  const [showSort, setShowSort] = useState(false);

  const openTasks = state.tasks.filter(t => t.status === 'open');

  let filtered = openTasks;
  if (activeCategory !== 'All') filtered = filtered.filter(t => t.category === activeCategory);
  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(t => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.location.toLowerCase().includes(q));
  }
  if (sort === 'Highest Payout') filtered = [...filtered].sort((a, b) => b.payout - a.payout);
  if (sort === 'Newest First') filtered = [...filtered].sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));

  return (
    <div className="min-h-dvh bg-background text-on-background pb-20">
      {/* TopBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 h-16 bg-white border-b border-[#F1F1F1] dry-shadow">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant">
            <img
              src={state.user.avatar}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(state.user.name)}&background=68b946&color=fff`; }}
            />
          </div>
          <span className="text-lg font-extrabold text-zinc-900 tracking-tighter">PaidSheet</span>
        </div>
        <button
          onClick={() => { dispatch({ type: 'SWITCH_ROLE' }); navigate('/asker'); }}
          className="bg-[#F1F1F1] px-4 py-2 rounded font-semibold text-sm text-zinc-900 hover:bg-zinc-200 transition-colors active:scale-95 duration-150"
        >
          Switch Role
        </button>
      </header>

      <main className="pt-24 pb-32 px-4 max-w-2xl mx-auto">
        {/* Header */}
        <section className="mb-8">
          <h1 className="text-[40px] font-bold text-on-surface mb-3">Live Task Feed</h1>
          {/* Role toggle pills */}
          <div className="flex items-center gap-2 mb-6 p-1 bg-surface-container rounded-lg max-w-fit">
            <button
              onClick={() => { dispatch({ type: 'SWITCH_ROLE' }); navigate('/asker'); }}
              className="px-4 py-1.5 rounded-md font-semibold text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Asker
            </button>
            <button className="px-4 py-1.5 rounded-md font-semibold text-sm bg-white shadow-sm text-primary">
              Doer
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-zinc-400">search</span>
            </div>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for tasks..."
              className="w-full bg-white border border-[#D9D9D9] rounded-lg py-4 pl-12 pr-4 focus:ring-0 focus:border-primary font-body-md placeholder-zinc-400 transition-colors outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute inset-y-0 right-4 flex items-center text-zinc-400 hover:text-zinc-700"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            )}
          </div>
        </section>

        {/* Filters */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4 overflow-x-auto scrollbar-hide pb-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors active:scale-95 ${activeCategory === cat ? 'bg-[#D9EAD3] text-primary' : 'bg-[#F1F1F1] text-zinc-500 hover:bg-zinc-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-xs text-zinc-400 uppercase tracking-widest">
              Active Requests ({filtered.length})
            </span>
            <div className="relative">
              <button
                onClick={() => setShowSort(s => !s)}
                className="flex items-center gap-1 font-semibold text-sm text-primary"
              >
                {sort}
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
              {showSort && (
                <div className="absolute right-0 top-8 bg-white border border-[#F1F1F1] rounded-xl dry-shadow py-2 z-10 min-w-[160px]">
                  {SORTS.map(s => (
                    <button
                      key={s}
                      onClick={() => { setSort(s); setShowSort(false); }}
                      className={`w-full text-left px-4 py-2.5 font-semibold text-sm hover:bg-surface-container-low transition-colors ${sort === s ? 'text-primary' : 'text-on-surface'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Task List */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="material-symbols-outlined text-[80px] text-zinc-200 mb-4">search_off</span>
            <h3 className="font-semibold text-[24px] text-zinc-900 mb-2">No tasks found</h3>
            <p className="text-on-surface-variant">Try adjusting your filters or search keywords.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(task => <TaskCard key={task.id} task={task} />)}
          </div>
        )}
      </main>

      <BottomNav />

      {/* FAB */}
      <button
        onClick={() => navigate('/post/details')}
        className="fixed right-6 bottom-24 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center green-shadow active:scale-95 transition-transform z-40"
      >
        <span className="material-symbols-outlined font-semibold">add</span>
      </button>
    </div>
  );
}
