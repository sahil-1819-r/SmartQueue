export const log = (scope, message) => {
  console.log(`[${scope}] ${message}`);
};

export const logError = (scope, error) => {
  console.error(`[${scope}]`, error);
};
