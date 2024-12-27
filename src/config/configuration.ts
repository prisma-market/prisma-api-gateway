export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  authService: {
    url: process.env.AUTH_SERVICE_URL || 'http://auth-service:8001',
  },
  userService: {
    url: process.env.USER_SERVICE_URL || 'http://user-service:8002',
  },
});
