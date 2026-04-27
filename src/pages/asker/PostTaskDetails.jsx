import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/TopBar';

const CATEGORIES = ['Academic', 'Errand', 'Tech', 'Events', 'Labor'];

export default function PostTaskDetails() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', category: '', description: '', location: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Task title is required';
    if (!form.category) e.category = 'Please select a category';
    if (!form.description.trim()) e.description = 'Description is required';
    if (form.description.trim().length < 20) e.description = 'Please describe the task in at least 20 characters';
    if (!form.location.trim()) e.location = 'Location is required';
    return e;
  };

  const handleNext = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    // Store in session
    sessionStorage.setItem('draft_task_step1', JSON.stringify(form));
    navigate('/post/budget');
  };

  return (
    <div className="min-h-dvh bg-background">
      <TopBar showBack title="Post a Task" showRole={false} showAvatar={false} />

      <main className="pt-24 pb-32 px-4 md:px-8 max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h1 className="text-[32px] font-bold text-on-surface">Post a Task</h1>
              <p className="text-on-surface-variant mt-1">Step 1 of 2: Task Details</p>
            </div>
            <span className="font-semibold text-sm text-primary uppercase tracking-wider hidden md:block">50% Complete</span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-primary transition-all duration-500" />
          </div>
        </div>

        <div className="bg-white border border-outline-variant rounded-xl p-6 md:p-8 dry-shadow">
          <form className="space-y-6" onSubmit={handleNext}>
            {/* Title */}
            <div className="space-y-1.5">
              <label className="font-semibold text-sm text-on-surface-variant block" htmlFor="title">Task Title</label>
              <input
                id="title"
                type="text"
                value={form.title}
                onChange={e => { setForm(f => ({ ...f, title: e.target.value })); setErrors(ev => ({ ...ev, title: '' })); }}
                placeholder="e.g., Print and submit my assignment"
                className={`w-full bg-white border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-secondary ${errors.title ? 'border-error' : 'border-outline'}`}
              />
              {errors.title && <p className="text-error text-xs font-semibold">{errors.title}</p>}
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="font-semibold text-sm text-on-surface-variant block">Category</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => { setForm(f => ({ ...f, category: cat })); setErrors(ev => ({ ...ev, category: '' })); }}
                    className={`px-4 py-2 rounded-lg border font-semibold text-sm transition-all active:scale-95 ${form.category === cat ? 'bg-[#D9EAD3] border-primary-container text-primary' : 'bg-white border-outline-variant text-on-surface-variant hover:bg-surface-container-low'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {errors.category && <p className="text-error text-xs font-semibold">{errors.category}</p>}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="font-semibold text-sm text-on-surface-variant block" htmlFor="description">Description</label>
              <textarea
                id="description"
                rows={6}
                value={form.description}
                onChange={e => { setForm(f => ({ ...f, description: e.target.value })); setErrors(ev => ({ ...ev, description: '' })); }}
                placeholder="Describe the task details, requirements, and any tools needed..."
                className={`w-full bg-white border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none placeholder:text-secondary ${errors.description ? 'border-error' : 'border-outline'}`}
              />
              {errors.description && <p className="text-error text-xs font-semibold">{errors.description}</p>}
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="font-semibold text-sm text-on-surface-variant block" htmlFor="location">Location</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">location_on</span>
                <input
                  id="location"
                  type="text"
                  value={form.location}
                  onChange={e => { setForm(f => ({ ...f, location: e.target.value })); setErrors(ev => ({ ...ev, location: '' })); }}
                  placeholder="e.g., CSE Department, Room 204"
                  className={`w-full bg-white border rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-secondary ${errors.location ? 'border-error' : 'border-outline'}`}
                />
              </div>
              {errors.location && <p className="text-error text-xs font-semibold">{errors.location}</p>}
            </div>

            {/* Hint */}
            <div className="flex items-start gap-3 p-3 bg-surface-container-low rounded-lg border border-outline-variant/30">
              <span className="material-symbols-outlined text-primary text-xl">info</span>
              <p className="font-semibold text-sm text-on-surface-variant">Be as specific as possible. You'll set your budget in the next step.</p>
            </div>
          </form>
        </div>

        {/* Nav Buttons */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-on-surface-variant font-semibold hover:bg-surface-container rounded-lg px-4 py-3 transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Cancel
          </button>
          <button
            onClick={handleNext}
            className="bg-primary text-on-primary font-semibold text-[16px] rounded-lg px-10 py-3 hover:bg-surface-tint dry-shadow transition-all active:scale-95 flex items-center gap-1.5"
          >
            Next
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </main>
    </div>
  );
}
