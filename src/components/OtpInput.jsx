import { useEffect, useRef } from 'react';

export default function OtpInput({ length = 6, value, onChange }) {
  const inputsRef = useRef([]);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, '');
    if (!val) {
      const next = [...value];
      next[idx] = '';
      onChange(next);
      return;
    }
    const char = val[val.length - 1];
    const next = [...value];
    next[idx] = char;
    onChange(next);
    if (idx < length - 1) inputsRef.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !value[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    const next = [...value];
    pasted.split('').forEach((c, i) => { next[i] = c; });
    onChange(next);
    const focusIdx = Math.min(pasted.length, length - 1);
    inputsRef.current[focusIdx]?.focus();
  };

  return (
    <div className="flex justify-between gap-2 sm:gap-3">
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          ref={el => inputsRef.current[idx] = el}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[idx] || ''}
          onChange={e => handleChange(e, idx)}
          onKeyDown={e => handleKeyDown(e, idx)}
          onPaste={handlePaste}
          className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold border border-[#D9D9D9] bg-white rounded-lg transition-all focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          placeholder="·"
        />
      ))}
    </div>
  );
}
