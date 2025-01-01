import React from 'react';
import { Activity as ActivityIcon, Clock } from 'lucide-react';
import { Activity } from '../types/activity';
import { formatDate } from '../utils/date';
import LoadingSpinner from './LoadingSpinner';
import { activityTypes } from '../utils/constants';

interface RecentActivitiesProps {
  activities: Activity[];
  isLoading: boolean;
}

interface ActivityItemProps {
  activity: Activity;
}

function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-all group">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-gray-600/50 rounded-lg group-hover:bg-gray-600 transition-all">
          <ActivityIcon className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className="text-white font-medium">{activityTypes[activity.type as keyof typeof activityTypes]}</h3>
          <p className="text-sm text-gray-400">{formatDate(activity.timestamp)}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-white font-medium">{activity.duration} menit</p>
        <p className="text-sm text-gray-400">{activity.calories} kkal</p>
      </div>
    </div>
  );
}

export default function RecentActivities({ activities, isLoading }: RecentActivitiesProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/10 rounded-xl p-6 hover:border-purple-500/20 transition-all">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-purple-400" />
        Aktivitas Terbaru
      </h2>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : activities.length === 0 ? (
        <p className="text-gray-400 text-center py-8">Belum ada aktivitas yang dicatat</p>
      ) : (
        <div className="space-y-3">
          {activities.slice(0, 5).map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
}