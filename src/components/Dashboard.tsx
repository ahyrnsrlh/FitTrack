import React, { useState, useEffect } from 'react';
import { Activity, BarChart3, Calendar, Clock, Dumbbell, Flame } from 'lucide-react';
import StatCard from './StatCard';
import ActivityForm from './ActivityForm';
import RecentActivities from './RecentActivities';
import LoadingSpinner from './LoadingSpinner';
import ActivityChart from './ActivityChart';
import { Activity as ActivityType, ActivityFormData } from '../types/activity';
import { calculateCalories } from '../utils/calories';

export default function Dashboard() {
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulate loading initial data
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleSubmitActivity = async (formData: ActivityFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newActivity: ActivityType = {
      id: Date.now().toString(),
      ...formData,
      calories: calculateCalories(formData.duration, formData.intensity),
      timestamp: new Date().toISOString()
    };
    
    setActivities(prev => [newActivity, ...prev]);
    setIsSubmitting(false);
  };

  const totalCalories = activities.reduce((sum, act) => sum + act.calories, 0);
  const totalDuration = activities.reduce((sum, act) => sum + act.duration, 0);
  const streak = activities.length > 0 ? 7 : 0;

  return (
    <div className="min-h-screen bg-gray-900 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg fill=\'%234B5563\' fill-opacity=\'0.05\'%3E%3Cpath opacity=\'.5\' d=\'M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z\'/%3E%3Cpath d=\'M6 5V0H5v5H0v1h5v94h1V6h94V5H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Selamat Datang Kembali!</h1>
          <p className="text-gray-400">Pantau progres kebugaran dan capai targetmu</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Kalori"
            value={totalCalories.toString()}
            unit="kkal"
            icon={<Flame className="w-6 h-6 text-orange-500" />}
            isLoading={isLoading}
          />
          <StatCard
            title="Waktu Olahraga"
            value={(totalDuration / 60).toFixed(1)}
            unit="jam"
            icon={<Clock className="w-6 h-6 text-blue-500" />}
            isLoading={isLoading}
          />
          <StatCard
            title="Total Aktivitas"
            value={activities.length.toString()}
            unit="sesi"
            icon={<Activity className="w-6 h-6 text-green-500" />}
            isLoading={isLoading}
          />
          <StatCard
            title="Streak"
            value={streak.toString()}
            unit="hari"
            icon={<Calendar className="w-6 h-6 text-purple-500" />}
            isLoading={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/10 rounded-xl p-6 hover:border-purple-500/20 transition-all">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              Ringkasan Aktivitas
            </h2>
            <div className="h-64">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <LoadingSpinner />
                </div>
              ) : (
                <ActivityChart activities={activities} />
              )}
            </div>
          </div>

          <RecentActivities 
            activities={activities}
            isLoading={isLoading}
          />
        </div>

        <ActivityForm 
          onSubmit={handleSubmitActivity}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
}