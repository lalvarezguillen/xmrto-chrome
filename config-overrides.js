module.exports = function override(config) {
  config.optimization.runtimeChunk = false;
  config.optimization.splitChunks = {
    cacheGroups: {
      default: false
    }
  };
  config.output.filename = 'static/js/[name].js';
  config.plugins[5].options.filename = 'static/css/[name].css';
  return config;
};
