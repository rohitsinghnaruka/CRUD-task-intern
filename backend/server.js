const app = require('./src/app');
const connectDB = require('./src/config/db');
const { PORT, NODE_ENV } = require('./src/config/env');

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`\n🚀 Server running in ${NODE_ENV} mode on port ${PORT}`);
      console.log(`📖 API Docs: http://localhost:${PORT}/api-docs`);
      console.log(`❤️  Health:   http://localhost:${PORT}/api/health\n`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
