import React from 'react';
import { PlusCircle } from 'lucide-react';
import { ActivityFormData } from '../types/activity';
import { useActivityForm } from '../hooks/useActivityForm';
import { activityTypes, activityColors } from '../utils/constants';

interface Props {
  onSubmit: (activity: ActivityFormData) => void;
  isLoading: boolean;
}

export default function ActivityForm({ onSubmit, isLoading }: Props) {
  const { formData, handleChange, handleSubmit } = useActivityForm(onSubmit);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/10 rounded-xl p-6 hover:border-purple-500/20 transition-all">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-purple-400" />
        Catat Aktivitas Baru
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Jenis Aktivitas
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            >
              <option value="">Pilih aktivitas</option>
              {Object.entries(activityTypes).map(([key, label]) => (
                <option 
                  key={key} 
                  value={key}
                  className="bg-gray-700"
                  style={{ color: activityColors[key as keyof typeof activityColors] }}
                >
                  {label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Durasi (menit)
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration.toString()}
              onChange={handleChange}
              className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              min="1"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Intensitas
          </label>
          <div className="flex gap-4">
            {['Rendah', 'Sedang', 'Tinggi'].map((intensity) => (
              <label key={intensity} className="flex items-center">
                <input
                  type="radio"
                  name="intensity"
                  value={intensity}
                  checked={formData.intensity === intensity}
                  onChange={handleChange}
                  className="w-4 h-4 text-purple-500 bg-gray-700/50 border-gray-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-300">{intensity}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Menyimpan...</span>
            </>
          ) : (
            'Simpan Aktivitas'
          )}
        </button>
      </form>
    </div>
  );
}