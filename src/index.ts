import { io } from 'socket.io-client';
import express from 'express';
import dotenv from 'dotenv';
import { createTransfer, getTransferCount } from './controller/TransferController';
import { TransferEvent } from './models/TransferEvent';
import { sequelize } from './db';

dotenv.config()

const app = express();
const socket = io(process.env.SOCKET_SERVER_URL || "");

sequelize.sync().then(() => {
    console.log('Synchronized.');
})

socket.on("Transfer", async (data: TransferEvent) => {
    await createTransfer(data.from, data.to, data.tokenId, data.txHash, data.value);
    console.log(`Transfer ${data.txHash} is stored.`)
})
  
app.listen(process.env.API_PORT, () => {
    console.log(`API listening on port ${process.env.API_PORT}`)
})