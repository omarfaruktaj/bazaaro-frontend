/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}
