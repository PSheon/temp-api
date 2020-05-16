module.exports = {
  /* API 端口 */
  API_PORT: 3000,

  /* API 密鑰，預設 3 天過期 */
  JWT_SECRET: 'MyUltraSecurePassWordIWontForgetToChange',
  JWT_EXPIRATION_IN_MINUTES: 4320,

  /* Mongo 資料庫位址 */
  MONGO_URI: 'mongodb://localhost:27017/myprojectdbname',

  /* API Socket JWT 加密 */
  ENABLE_SOCKET_AUTH: true,

  /* API 狀態監控器 */
  ENABLE_STATUS_MONITOR: true,
  STATUS_MONITOR_CONFIG: {
    healthChecks: [
      {
        method: 'GET',
        protocol: 'http',
        host: 'localhost',
        port: '3000',
        path: '/api/cities/all'
      }
    ]
  },

  /* API 日誌紀錄 */
  ENABLE_LOG_RECORDER: true,

  /* API 文件 UI 窗口
    路徑預設為 /api-docs
    文件位置預設為 docs 資料夾下的 .yaml 檔案
  */
  ENABLE_SWAGGER_DOCS_UI: true,
  SWAGGER_UI_ROUTE_PATH: '/api-docs',
  SWAGGER_DEFINITION: {
    info: {
      title: 'API Skeleton',
      version: '1.0.0',
      description: 'Generate API document with swagger'
    }
  },

  /* 認證信件設定 */
  EMAIL_FROM_NAME: 'My Project',
  EMAIL_FROM_ADDRESS: 'info@myproject.com',
  EMAIL_SMTP_DOMAIN_MAILGUN: 'myproject.com',
  EMAIL_SMTP_API_MAILGUN: 123456,

  FRONTEND_URL: 'http://localhost:8080',

  /* Redis 快取 */
  ENABLE_REDIS_CACHE: false,
  REDIS_NAMESPACE: 'RedisCache',
  REDIS_HOST: '127.0.0.1',
  REDIS_PORT: 6379
}
