module.exports = {
  path: '/',
  socketPath: '/socket.io',

  /* 時間跨度 */
  spans: [
    {
      interval: 1,
      retention: 60
    },
    {
      interval: 5,
      retention: 60
    },
    {
      interval: 15,
      retention: 60
    }
  ],

  /* Socket 端口 */
  port: null,

  /* 顯示圖表 */
  chartVisibility: {
    cpu: true,
    mem: true,
    load: true,
    heap: true,
    eventLoop: true,
    responseTime: true,
    rps: true,
    statusCodes: true
  },

  /* 排除路由 */
  ignoreStartsWith: '/admin',

  /* API 健康度 */
  healthChecks: [],

  /* API 健康度週期，預設 5 分鐘 */
  healthChecksInterval: 300
}
