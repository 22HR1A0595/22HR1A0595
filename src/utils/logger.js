export const logAction = (type, payload) => {
  const entry = { type, payload, timestamp: new Date().toISOString() };
  localStorage.setItem(`log-${Date.now()}`, JSON.stringify(entry));
};

export const logError = (type, message) => {
  const entry = { type: 'ERROR', message, timestamp: new Date().toISOString() };
  localStorage.setItem(`error-${Date.now()}`, JSON.stringify(entry));
};