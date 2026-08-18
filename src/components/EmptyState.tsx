import React from 'react';
import { Compass, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  onReset: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onReset }) => {
  return (
    <div className="text-center py-16 px-4 bg-white rounded-2xl border border-dashed border-slate-300 max-w-lg mx-auto shadow-sm my-8">
      <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Compass className="w-8 h-8 animate-pulse" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
        Поездов по вашему запросу не найдено
      </h3>
      <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
        Попробуйте изменить параметры поиска, выбрать другой регион или месяц отправления.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow-indigo-600/30 transition duration-150 cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Сбросить все фильтры</span>
      </button>
    </div>
  );
};
