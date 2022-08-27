import { models } from '../db';
import { Op } from 'sequelize';
import { BigNumber } from 'ethers';

export const getTotalTransfersCount = async () => {
    let count = await models.Transfer.count();
    return { result: count }
}

export const getTransfersCount = async (tokenId: string) => {
    let count = await models.Transfer.count({ where: { tokenId } });
    return { result: count }
}

export const getTotalSalesCount = async () => {
    let count = await models.Transfer.count({ where: { value: { [Op.ne]: "0"} } });
    return { result: count }
}

export const getSalesCount = async (tokenId: string) => {
    let count = await models.Transfer.count({ where: { tokenId, value: { [Op.ne]: "0"} } });
    return { result: count }
}

export const getTotalVolume = async () => {
    let result = await models.Transfer.findAll()

    let string = JSON.stringify(result);
    let transfers = JSON.parse(string);

    console.log(transfers)
    
    let sum = BigNumber.from(0);

    transfers.map((t: { value: any; }) => {
        sum = sum.add(BigNumber.from(t.value));
    })

    return { result: sum.toString() }
}

export const getTotalVolumeForDay = async () => {
    let date = new Date();
    date.setDate(date.getDate() - 1);

    let result = await models.Transfer.findAll({
        where: {
            created_at: {
                [Op.gte]: date
            }
        }
    })

    let string = JSON.stringify(result);
    let transfers = JSON.parse(string);

    console.log(transfers)
    
    let sum = BigNumber.from(0);

    transfers.map((t: { value: any; }) => {
        sum = sum.add(BigNumber.from(t.value));
    })

    return { result: sum.toString() }
}

export const getTotalVolumeForMonth = async () => {
    let date = new Date();
    date.setDate(date.getMonth() - 1);
    
    let result = await models.Transfer.findAll({
        where: {
            created_at: {
                [Op.gte]: date
            }
        }
    })

    let string = JSON.stringify(result);
    let transfers = JSON.parse(string);

    console.log(transfers)
    
    let sum = BigNumber.from(0);

    transfers.map((t: { value: any; }) => {
        sum = sum.add(BigNumber.from(t.value));
    })

    return { result: sum.toString() }
}

export const createTransfer = async (from: string, to: string, tokenId: string, txHash: string, value: string) => {
    await models.Transfer.create({
        from,
        to,
        tokenId,
        txHash,
        value,
        createdAt: new Date()
    })
}