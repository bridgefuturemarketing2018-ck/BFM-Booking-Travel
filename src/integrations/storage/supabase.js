'use strict';

const { createProvider } = require('../provider-factory');

function createSupabaseStorageProvider(config) {
  const configured = Boolean(config.credentials.supabaseUrl);
  return createProvider({
    name: 'supabase',
    configured,
    actions: {
      save: async (payload) => ({ success: true, provider: 'supabase', payload }),
    },
  });
}

module.exports = { createSupabaseStorageProvider };
