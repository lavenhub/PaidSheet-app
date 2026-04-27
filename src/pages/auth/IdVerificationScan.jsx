import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IdVerificationScan() {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    navigate('/verify-id/review');
  };

  return (
    <div className="min-h-dvh bg-background flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-white border-b border-[#F1F1F1] h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#F1F1F1] rounded-full active:scale-95">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="font-bold text-[#68B946] text-lg">PaidSheet</span>
        </div>
      </header>

      <main className="flex-1 pt-24 pb-12 px-4 max-w-xl mx-auto w-full">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h1 className="text-[32px] font-bold text-on-surface">ID Verification</h1>
              <p className="text-on-surface-variant mt-1">Step 3 of 4 · Student ID Scan</p>
            </div>
          </div>
          <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-primary transition-all duration-500" />
          </div>
        </div>

        {/* Scan Area */}
        <div className="bg-white border border-[#F1F1F1] rounded-xl p-6 dry-shadow space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-[#D9EAD3] rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-primary text-[32px]">id_card</span>
            </div>
            <h2 className="text-[24px] font-semibold text-on-surface">Scan Your Student ID</h2>
            <p className="text-on-surface-variant text-sm">Place your student ID card clearly in the frame, or upload a photo of it.</p>
          </div>

          {/* Camera / Upload Area */}
          <label className="block cursor-pointer">
            <input ref={inputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFile} />
            <div className={`relative border-2 ${preview ? 'border-primary-container' : 'border-dashed border-[#D9D9D9]'} rounded-xl overflow-hidden`} style={{ height: 240 }}>
              {preview ? (
                <>
                  <img src={preview} alt="ID preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <div className="bg-white/90 rounded-xl px-4 py-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">check_circle</span>
                      <span className="font-semibold text-primary text-sm">ID Captured</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-surface-container-low">
                  {/* Viewfinder corners */}
                  <div className="relative w-40 h-28 border-2 border-primary rounded">
                    <div className="absolute top-0 left-0 w-5 h-5 border-t-4 border-l-4 border-primary rounded-tl" />
                    <div className="absolute top-0 right-0 w-5 h-5 border-t-4 border-r-4 border-primary rounded-tr" />
                    <div className="absolute bottom-0 left-0 w-5 h-5 border-b-4 border-l-4 border-primary rounded-bl" />
                    <div className="absolute bottom-0 right-0 w-5 h-5 border-b-4 border-r-4 border-primary rounded-br" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary/40 text-[40px]">id_card</span>
                    </div>
                  </div>
                  <span className="font-semibold text-on-surface-variant text-sm">Tap to scan or upload ID</span>
                </div>
              )}
            </div>
          </label>

          {preview && (
            <button
              onClick={() => setPreview(null)}
              className="w-full py-2 border border-outline-variant rounded-lg text-on-surface-variant font-semibold text-sm hover:bg-surface-container-low transition-colors"
            >
              Retake Photo
            </button>
          )}

          {/* Tips */}
          <div className="space-y-2">
            {[
              'Ensure all text on your ID is clearly readable',
              'Include your photo and student ID number',
              'Avoid glare or shadows on the card',
            ].map(tip => (
              <div key={tip} className="flex items-center gap-2 text-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                {tip}
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!preview || loading}
            className="w-full bg-primary text-white font-semibold text-[16px] py-4 rounded-lg hover:bg-surface-tint transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Analysing ID...
              </>
            ) : (
              <>Submit ID<span className="material-symbols-outlined">arrow_forward</span></>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
