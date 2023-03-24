import express from 'express';
import getController from '../controller/getController';

const getRouter = express.Router();

getRouter.get('/', getController.getHome);

export default getRouter;
