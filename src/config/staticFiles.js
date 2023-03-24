import express from 'express';
import appRoot from 'app-root-path';

export const configStaticFiles = app => {
  app.use(express.static(appRoot.toString() + '/src/public'));
};
