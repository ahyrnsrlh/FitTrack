export const formatDate = (date: string | Date): string => {
  const now = new Date();
  const activityDate = new Date(date);
  
  if (activityDate.toDateString() === now.toDateString()) {
    return `Hari ini, ${activityDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  if (activityDate.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString()) {
    return `Kemarin, ${activityDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  return activityDate.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  });
};