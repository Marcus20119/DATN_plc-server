import express from 'express';
import http from 'http';
import nodes7 from 'nodes7';
import dotenv from 'dotenv';

import { configViewEngine } from './config/viewEngine';
import { configStaticFiles } from './config/staticFiles';
import { connectPLC } from './config/connectPLC';
import { initRealtime } from './config/realtime';

const app = express();

configStaticFiles(app);
configViewEngine(app);

dotenv.config();
let port = process.env.PORT;

const server = http.Server(app);

server.listen(port, () => {
  console.log(`App listening on port http:/localhost:${port}`);
});

// KHỞI TẠO KẾT NỐI PLC VÀ SOCKET
const conn_plc = new nodes7();
connectPLC(conn_plc);
initRealtime(conn_plc);
