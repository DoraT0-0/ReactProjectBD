module.exports = (sequelize, DataTypes) => {
    const Provider = sequelize.define("Provider", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        adress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    Provider.associate = (models) => {
        Provider.hasMany(models.Products)
    }

    return Provider
}
