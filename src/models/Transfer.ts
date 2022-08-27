import { Sequelize, DataTypes } from "sequelize"

export default (sequelize: Sequelize) => {
    const Transfer = sequelize.define(
        "Transfer",
        {
            id: {
                type: DataTypes.INTEGER,
                unique: true,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: "id",
            },
            from: {type: DataTypes.STRING, field: "from"},
            to: {type: DataTypes.STRING, field: "to"},
            tokenId: {type: DataTypes.STRING, field: "token_id"},
            value: {type: DataTypes.STRING, field: "eth_value"},
            txHash: {type: DataTypes.STRING, field: "tx_hash"},
            createdAt: {type: DataTypes.DATE, field: "created_at"},
            updatedAt: {type: DataTypes.DATE, field: "updated_at"}
        },
        {
            tableName: "transfers",
            timestamps: false,
        }
    )

    return Transfer
}