import app from "./app.js";
import { config } from "./config/index.js";
import { logger } from "./utils/logger.js";

app.listen(config.port, () => {
  logger.info(`==================================================`);
  logger.info(`SentinelWell Backend running on http://localhost:${config.port}`);
  logger.info(`API Documentation: http://localhost:${config.port}/api/docs`);
  logger.info(`Health Endpoint:   http://localhost:${config.port}/api/health`);
  logger.info(`==================================================`);
});
