import { models } from '../db';
import { Op } from 'sequelize/types';
import { BigNumber } from 'ethers';

export const getTransferCount = async (tokenId: number) => {
    return await models.Transfer.count({ where: { tokenId } });
}

export const getSellsCount = async (tokenId: number) => {
    return await models.Transfer.count({ where: { tokenId, value: { [Op.gt]: 0} } });
}

export const getTotalVolume = async () => {
    return await models.Transfer.sum("eth_value");
}

export const getTotalVolumeForDay = async () => {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return await models.Transfer.sum("eth_value", {
        where: {
            created_at: {
                [Op.gte]: date
            }
        }
    });
}

export const getTotalVolumeForMonth = async () => {
    let date = new Date();
    date.setDate(date.getMonth() - 1);
    return await models.Transfer.sum("eth_value", {
        where: {
            created_at: {
                [Op.gte]: date
            }
        }
    });
}

export const createTransfer = async (from: string, to: string, tokenId: BigNumber, txHash: string, value: BigNumber) => {
    await models.Transfer.create({
        from,
        to,
        tokenId,
        txHash,
        value
    })
}