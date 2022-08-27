import { io } from 'socket.io-client';
import express from 'express';
import dotenv from 'dotenv';
import { createTransfer, getTotalVolumeForDay, getTotalVolumeForMonth, getTransfersCount, getSalesCount, getTotalSalesCount, getTotalTransfersCount } from './controllers/TransferController';
import { TransferEvent } from './entities/TransferEvent';
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

app.get('/getDailyVolume', async (req, res) => {
    try {
        let volume = await getTotalVolumeForDay()
        res.send(volume);
    } catch(e) {
        console.log(e)
    }
})

app.get('/getMonthlyVolume', async (req, res) => {
    try {
        let volume = await getTotalVolumeForMonth()
        res.send(volume);
    } catch(e) {
        console.log(e)
    }
})

app.get('/getTokenTransfersCount', async (req, res) => {
    try {
        let count = await getTransfersCount(String(req.query.tokenId))
        res.send(count);
    } catch(e) {
        console.log(e)
    }
})

app.get('/getTokenSalesCount', async (req, res) => {
    try {
        let count = await getSalesCount(String(req.query.tokenId))
        res.send(count);
    } catch(e) {
        console.log(e)
    }
})

app.get('/getTotalTransfersCount', async (req, res) => {
    try {
        let count = await getTotalTransfersCount()
        res.send(count);
    } catch(e) {
        console.log(e)
    }
})

app.get('/getTotalSalesCount', async (req, res) => {
    try {
        let count = await getTotalSalesCount()
        res.send(count);
    } catch(e) {
        console.log(e)
    }
})
  
app.listen(process.env.API_PORT, () => {
    console.log(`API listening on port ${process.env.API_PORT}`)
})