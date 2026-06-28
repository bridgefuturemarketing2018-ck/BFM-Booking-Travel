'use strict';

function createProvider({ name, configured, actions }) {
  return {
    name,
    configured,
    async execute(action, payload) {
      if (!configured) {
        return {
          success: false,
          provider: name,
          action,
          detail: 'Provider is not configured. Add credentials in environment variables.',
        };
      }

      const fn = actions[action];
      if (!fn) {
        return {
          success: false,
          provider: name,
          action,
          detail: 'Action not implemented for provider.',
        };
      }

      return fn(payload);
    },
  };
}

module.exports = {
  createProvider,
};
