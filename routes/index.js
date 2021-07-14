const express = require('express');
const websiteRoutes = require('./website/website-routes');

const apiRouter = express.Router();

apiRouter.use('/', websiteRoutes);

module.exports = apiRouter;