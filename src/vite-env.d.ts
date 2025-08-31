/// <reference types="vite/client" />

interface ImportMeta {
  readonly hot?: {
    accept: (fn?: (module: any) => void) => void;
    dispose: (fn: (data: any) => void) => void;
    decline: () => void;
    invalidate: () => void;
    on: (event: string, fn: (data: any) => void) => void;
  };
}