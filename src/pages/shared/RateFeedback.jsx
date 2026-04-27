import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function RateFeedback() {
  const { id } = useParams();
  const { state } = useApp();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const task = state.tasks.find(t => t.id === id) || state.tasks[0];
  const doer = state.allUsers[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-dvh bg-background flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center space-y-6">
          <div className="w-24 h-24 bg-[#D9EAD3] rounded-full flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-primary text-[48px] ms-fill">reviews</span>
          </div>
          <h1 className="font-bold text-[32px] text-on-surface">Review Submitted!</h1>
          <p className="text-on-surface-variant">Thank you for your feedback. It helps build a trusted campus community.</p>
          <button onClick={() => navigate('/asker')} className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-surface-tint transition-all active:scale-[0.98]">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-white border-b border-[#F1F1F1] h-16 flex items-center px-4 dry-shadow">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#F1F1F1] rounded-full active:scale-95 mr-3">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="font-bold text-lg text-on-surface">Rate Your Doer</h1>
      </header>

      <main className="flex-1 pt-24 pb-12 px-4 max-w-xl mx-auto w-full">
        {doer && (
          <div className="flex flex-col items-center mb-8 text-center">
            <img
              src={doer.avatar}
              alt={doer.name}
              className="w-20 h-20 rounded-full border-2 border-primary-container object-cover mb-3"
            />
            <h2 className="font-bold text-[24px] text-on-surface">{doer.name}</h2>
            <p className="text-on-surface-variant text-sm">{task?.title}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Star Rating */}
          <div className="bg-white border border-[#F1F1F1] rounded-xl p-6 dry-shadow text-center">
            <p className="font-semibold text-on-surface mb-4">How would you rate the experience?</p>
            <div className="flex justify-center gap-3 mb-3">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="text-[36px] transition-transform active:scale-110"
                >
                  <span className={`material-symbols-outlined text-[40px] ${(hover || rating) >= star ? 'text-yellow-400 ms-fill' : 'text-zinc-300'}`}>
                    star
                  </span>
                </button>
              ))}
            </div>
            <p className="text-sm text-on-surface-variant font-semibold">
              {rating === 0 ? 'Select a rating' : ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][rating]}
            </p>
          </div>

          {/* Written feedback */}
          <div className="space-y-2">
            <label className="font-semibold text-sm text-on-surface-variant block" htmlFor="feedback">Written Feedback (optional)</label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              rows={4}
              placeholder="Share your experience with this doer..."
              className="w-full bg-white border border-outline-variant rounded-lg p-4 focus:ring-1 focus:ring-primary focus:border-primary outline-none resize-none placeholder:text-outline-variant"
            />
          </div>

          <button
            type="submit"
            disabled={rating === 0}
            className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-surface-tint transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Review
          </button>
        </form>
      </main>
    </div>
  );
}
