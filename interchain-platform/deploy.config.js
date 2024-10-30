module.exports = {
  // Production environment settings
  production: {
    domain: 'bloqz.xyz',
    ssl: {
      enabled: true,
      provider: 'godaddy',
      auto_renew: true
    },
    server: {
      host: 'bloqz.xyz',
      port: 443,
      protocol: 'https'
    },
    api: {
      endpoint: 'https://api.bloqz.xyz',
      version: 'v1'
    },
    cdn: {
      enabled: true,
      provider: 'cloudflare',
      cacheControl: 'public, max-age=31536000'
    },
    database: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    firebase: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: 'bloqz.xyz',
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID
    },
    blockchain: {
      networkId: process.env.NETWORK_ID,
      rpcUrl: process.env.RPC_URL,
      wsUrl: process.env.WS_URL,
      contractAddresses: {
        main: process.env.MAIN_CONTRACT_ADDRESS,
        token: process.env.TOKEN_CONTRACT_ADDRESS
      }
    }
  },

  // Deployment settings
  deploy: {
    method: 'docker',
    registry: process.env.DOCKER_REGISTRY,
    container: {
      name: 'bloqz-platform',
      port: 80
    },
    volumes: [
      {
        source: '/data',
        target: '/app/data'
      },
      {
        source: '/logs',
        target: '/app/logs'
      }
    ],
    env: {
      NODE_ENV: 'production',
      PORT: 80
    },
    healthCheck: {
      path: '/health',
      interval: '30s',
      timeout: '10s',
      retries: 3
    }
  },

  // DNS settings for GoDaddy
  dns: {
    provider: 'godaddy',
    records: [
      {
        type: 'A',
        name: '@',
        value: process.env.SERVER_IP,
        ttl: 600
      },
      {
        type: 'CNAME',
        name: 'www',
        value: 'bloqz.xyz',
        ttl: 600
      },
      {
        type: 'CNAME',
        name: 'api',
        value: 'bloqz.xyz',
        ttl: 600
      }
    ]
  },

  // Security settings
  security: {
    headers: {
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'X-Content-Type-Options': 'nosniff',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    },
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    },
    cors: {
      origin: ['https://bloqz.xyz', 'https://www.bloqz.xyz', 'https://api.bloqz.xyz'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }
  },

  // Monitoring and logging
  monitoring: {
    enabled: true,
    provider: 'datadog',
    metrics: {
      system: true,
      application: true,
      custom: true
    },
    logging: {
      level: 'info',
      format: 'json',
      destination: '/app/logs/app.log'
    },
    alerts: {
      endpoints: [
        {
          type: 'email',
          address: 'admin@bloqz.xyz'
        },
        {
          type: 'slack',
          webhook: process.env.SLACK_WEBHOOK_URL
        }
      ]
    }
  }
};
