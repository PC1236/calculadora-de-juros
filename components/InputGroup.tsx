import React from 'react';
import { HelpCircle } from 'lucide-react';

interface InputGroupProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  tooltip?: string;
  toggleOptions?: {
    value: string;
    onChange: (val: any) => void;
    options: { label: string; value: string }[];
  };
}

export const InputGroup: React.FC<InputGroupProps> = ({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  toggleOptions,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-300 flex items-center justify-between">
        {label}
      </label>
      <div className="relative flex rounded-md shadow-sm">
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-slate-400 sm:text-sm">{prefix}</span>
          </div>
        )}
        <input
          type="number"
          min="0"
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className={`block w-full rounded-l-md border-0 py-2.5 text-white bg-slate-950 ring-1 ring-inset ring-slate-700 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6 ${
            prefix ? 'pl-10' : 'pl-3'
          } ${toggleOptions ? 'rounded-r-none' : 'rounded-r-md'}`}
        />
        {suffix && !toggleOptions && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-slate-400 sm:text-sm">{suffix}</span>
          </div>
        )}
        
        {toggleOptions && (
          <div className="relative -ml-px flex">
            <select
              value={toggleOptions.value}
              onChange={(e) => toggleOptions.onChange(e.target.value)}
              className="group relative -ml-px block w-full rounded-r-md border-0 bg-slate-800 py-1.5 pl-3 pr-9 text-slate-300 ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6 cursor-pointer hover:bg-slate-700 transition-colors"
            >
              {toggleOptions.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};