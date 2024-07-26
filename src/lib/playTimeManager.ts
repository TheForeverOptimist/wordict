const PLAY_TIME_KEY = "wordict_last_play_time";

export const canPlay = (): boolean => {
  const lastPlayTime = localStorage.getItem(PLAY_TIME_KEY);
  if (!lastPlayTime) return true;

  const timeSinceLastPlay = Date.now() - parseInt(lastPlayTime, 10);
  return timeSinceLastPlay >= 24 * 60 * 60 * 1000; // 24 hours in milliseconds
};

export const recordPlayTime = (): void => {
  localStorage.setItem(PLAY_TIME_KEY, Date.now().toString());
};

export const getTimeUntilNextPlay = (): string => {
  const lastPlayTime = localStorage.getItem(PLAY_TIME_KEY);
  if (!lastPlayTime) return "You can play now!";

  const timeSinceLastPlay = Date.now() - parseInt(lastPlayTime, 10);
  const timeRemaining = 24 * 60 * 60 * 1000 - timeSinceLastPlay;

  if (timeRemaining <= 0) return "You can play now!";

  const hours = Math.floor(timeRemaining / (60 * 60 * 1000));
  const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));

  return `You can play again in ${hours} hours and ${minutes} minutes.`;
};
