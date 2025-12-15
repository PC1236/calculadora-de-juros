import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  colorClass: string;
  bgColorClass: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon: Icon,
  colorClass,
  bgColorClass,
}) => {
  return (
    <div className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800 flex items-start justify-between transition-all hover:border-slate-700">
      <div>
        <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
        <h3 className={`text-2xl font-bold ${colorClass}`}>{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${bgColorClass} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${colorClass}`} />
      </div>
    </div>
  );
};