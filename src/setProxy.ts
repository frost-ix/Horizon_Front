const { createProxyMiddleware } = require("http-proxy-middleware");

export default module.exports = function (app: any) {
  app.use(createProxyMiddleware("/", { target: "http://localhost:3100", changeOrigin: true }));
};
