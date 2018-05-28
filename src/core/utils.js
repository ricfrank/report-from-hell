export const isBrowser = () => typeof document !== 'undefined'
export const isReactNative = () =>
  typeof navigator !== 'undefined' && navigator.product === 'ReactNative'
