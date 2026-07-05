'use strict';

function toBool(value, fallback = false) {
  if (value === undefined) return fallback;
  return value === 'true';
}

function configFromEnv(env = process.env) {
  return {
    service: {
      port: Number(env.PORT || 3000),
      host: env.HOST || '0.0.0.0',
      environment: env.NODE_ENV || 'development',
      apiKey: env.INTERNAL_API_KEY || '',
      webhookMaxBytes: Number(env.WEBHOOK_MAX_BYTES || 1024 * 1024),
    },
    operations: {
      autoRecoveryEnabled: toBool(env.AUTO_RECOVERY_ENABLED, true),
      restartCommand: env.RESTART_COMMAND || '',
    },
    restClient: {
      baseUrl: env.EXTERNAL_API_BASE_URL || '',
      timeoutMs: Number(env.EXTERNAL_API_TIMEOUT_MS || 10000),
      apiKey: env.EXTERNAL_API_KEY || '',
    },
    providers: {
      payment: env.PAYMENT_PROVIDER || 'stripe',
      notification: env.NOTIFICATION_PROVIDER || 'sendgrid',
      storage: env.STORAGE_PROVIDER || 'postgres',
      media: env.MEDIA_PROVIDER || 's3',
      maps: env.MAPS_PROVIDER || 'google-maps',
      auth: env.AUTH_PROVIDER || 'oauth',
    },
    credentials: {
      stripeSecretKey: env.STRIPE_SECRET_KEY || '',
      paypalClientId: env.PAYPAL_CLIENT_ID || '',
      paypalSecret: env.PAYPAL_SECRET || '',
      paystackSecretKey: env.PAYSTACK_SECRET_KEY || '',
      flutterwaveSecretKey: env.FLUTTERWAVE_SECRET_KEY || '',
      twilioSid: env.TWILIO_ACCOUNT_SID || '',
      twilioToken: env.TWILIO_AUTH_TOKEN || '',
      sendgridApiKey: env.SENDGRID_API_KEY || '',
      smtpHost: env.SMTP_HOST || '',
      smtpUser: env.SMTP_USER || '',
      smtpPass: env.SMTP_PASS || '',
      mailgunApiKey: env.MAILGUN_API_KEY || '',
      firebaseProjectId: env.FIREBASE_PROJECT_ID || '',
      supabaseUrl: env.SUPABASE_URL || '',
      mongodbUri: env.MONGODB_URI || '',
      postgresUrl: env.POSTGRES_URL || '',
      mysqlUrl: env.MYSQL_URL || '',
      redisUrl: env.REDIS_URL || '',
      s3Bucket: env.S3_BUCKET || '',
      cloudinaryCloudName: env.CLOUDINARY_CLOUD_NAME || '',
      mapboxToken: env.MAPBOX_TOKEN || '',
      googleMapsApiKey: env.GOOGLE_MAPS_API_KEY || '',
      oauthClientId: env.OAUTH_CLIENT_ID || '',
      oauthClientSecret: env.OAUTH_CLIENT_SECRET || '',
      auth0Domain: env.AUTH0_DOMAIN || '',
      auth0ClientId: env.AUTH0_CLIENT_ID || '',
      auth0ClientSecret: env.AUTH0_CLIENT_SECRET || '',
      firebaseAuthProjectId: env.FIREBASE_AUTH_PROJECT_ID || '',
    },
  };
}

module.exports = {
  configFromEnv,
};
