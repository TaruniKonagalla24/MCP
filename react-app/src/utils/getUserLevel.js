const getUserLevel = (score) => {
    if (score >= 300) return { level: 5, badge: 'Master' };
    if (score >= 200) return { level: 4, badge: 'Expert' };
    if (score >= 120) return { level: 3, badge: 'Intermediate' };
    if (score >= 60) return { level: 2, badge: 'Beginner' };
    return { level: 1, badge: 'Starter' };
  };
  
  export default getUserLevel;