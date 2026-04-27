import { useRef, useState } from 'react';

export default function FileUpload({ onFilesChange, maxFiles = 3, accept = 'image/*' }) {
  const inputRef = useRef();
  const [previews, setPreviews] = useState([]);

  const handleFiles = (files) => {
    const arr = Array.from(files).slice(0, maxFiles - previews.length);
    arr.forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        setPreviews(prev => {
          const next = [...prev, { url: e.target.result, name: file.name }].slice(0, maxFiles);
          if (onFilesChange) onFilesChange(next);
          return next;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const remove = (idx) => {
    setPreviews(prev => {
      const next = prev.filter((_, i) => i !== idx);
      if (onFilesChange) onFilesChange(next);
      return next;
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Dropzone */}
        {previews.length < maxFiles && (
          <label
            className="md:col-span-2 group cursor-pointer flex flex-col items-center justify-center h-48 border-2 border-dashed border-[#D9D9D9] hover:border-primary-container bg-white transition-colors rounded-lg"
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              multiple={maxFiles > 1}
              className="hidden"
              onChange={e => handleFiles(e.target.files)}
            />
            <span className="material-symbols-outlined text-4xl text-outline mb-2 group-hover:text-primary-container transition-colors">
              add_a_photo
            </span>
            <span className="font-semibold text-on-surface-variant">Tap to upload photos</span>
            <span className="text-xs text-secondary mt-1">JPEG, PNG up to 10MB</span>
          </label>
        )}

        {/* Preview tiles */}
        {previews.map((p, idx) => (
          <div key={idx} className="relative h-48 border border-[#F1F1F1] bg-white rounded-lg overflow-hidden">
            <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
            <button
              onClick={() => remove(idx)}
              className="absolute top-2 right-2 bg-zinc-800/80 text-white p-1 rounded-full hover:bg-error transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-primary/90 text-white text-[10px] font-bold px-2 py-1">
              PHOTO {idx + 1} ATTACHED
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2 p-3 bg-surface-container-low rounded-lg border border-outline-variant/30">
        <span className="material-symbols-outlined text-primary text-sm">info</span>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          Make sure receipts are legible and delivery items are clearly visible in the frame.
        </p>
      </div>
    </div>
  );
}
