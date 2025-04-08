const initTracer = require('jaeger-client').initTracer;

const config = {
  serviceName: 'mern-backend',
  reporter: {
    logSpans: true,
    agentHost: 'localhost',
    agentPort: 6831
  },
  sampler: {
    type: 'const',
    param: 1
  }
};

const tracer = initTracer(config, {});
module.exports = tracer;