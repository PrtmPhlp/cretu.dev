import { useSyncExternalStore } from 'react';

const noop = () => {};
const subscribe = () => noop;
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * `false` during SSR and hydration, `true` once rendering on the client.
 * Replaces the `useEffect(() => setMounted(true), [])` pattern, which the
 * `react-hooks/set-state-in-effect` rule rejects.
 */
export function useMounted() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
