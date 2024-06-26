/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  future: {
    v2_routeConvention: true,
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
    v2_headers: true,
    v2_dev: true,
    v2_meta: [],
  },
  serverModuleFormat: 'cjs',
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: "all",
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
};
