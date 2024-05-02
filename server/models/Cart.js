module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define("Cart", {
        count : {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return Cart
}