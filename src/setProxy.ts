const { createProxyMiddleware } = require("http-proxy-middleware");

export default module.exports = function (app: any) {
  app.use(createProxyMiddleware("/", { target: "http://172.17.0.1:3100", changeOrigin: true }));
};
