export function existWordState(newValue: string) {
  window.localStorage.setItem('existWordId', JSON.stringify(newValue));

  window.dispatchEvent(
    new StorageEvent('storage', { key: 'existWordId', newValue })
  );
}

export const store = {
  getSnapshot: () => localStorage.getItem('existWordId'),
  subscribe: (listener: () => void) => {
    window.addEventListener('storage', listener);

    return () => void window.removeEventListener('existWordId', listener);
  },
  getServerSnapshot: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('existWordId');
    }

    return null;
  },
};
