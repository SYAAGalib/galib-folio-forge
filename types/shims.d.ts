// Minimal shims to satisfy TypeScript in Vite config without bringing full Node types
declare module "lovable-tagger" {
  export function componentTagger(): any;
}

// Allow usage of process in Vite config without Node types
declare const process: {
  cwd(): string;
  env: Record<string, string | undefined>;
};
