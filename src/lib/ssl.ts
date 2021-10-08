export const useRequireSSL = () => {
  const { location } = window;

  if (location.protocol !== 'https' && location.hostname !== 'localhost') {
    window.location.href = `https://${location.host}`;
  }
};
