import { LucideIcon } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface StatCardProps {
  title: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  isLoading?: boolean;
}

export default function StatCard({ title, value, unit, icon, isLoading = false }: StatCardProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/10 rounded-xl p-6 hover:border-purple-500/20 transition-all">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-400">{title}</span>
        {icon}
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-white">{value}</span>
          <span className="ml-1 text-purple-400">{unit}</span>
        </div>
      )}
    </div>
  );
}