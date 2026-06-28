'use strict';

const { createFirebaseStorageProvider } = require('./firebase');
const { createSupabaseStorageProvider } = require('./supabase');
const { createMongoStorageProvider } = require('./mongodb');
const { createPostgresStorageProvider } = require('./postgres');
const { createMysqlStorageProvider } = require('./mysql');
const { createRedisStorageProvider } = require('./redis');

function createStorageProvider(config) {
  const providers = {
    firebase: createFirebaseStorageProvider(config),
    supabase: createSupabaseStorageProvider(config),
    mongodb: createMongoStorageProvider(config),
    postgres: createPostgresStorageProvider(config),
    mysql: createMysqlStorageProvider(config),
    redis: createRedisStorageProvider(config),
  };

  return providers[config.providers.storage] || providers.postgres;
}

module.exports = {
  createStorageProvider,
};
