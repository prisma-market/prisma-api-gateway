export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    authService: {
      url: process.env.AUTH_SERVICE_URL || 'http://auth-service:8001',
    },
  }); 