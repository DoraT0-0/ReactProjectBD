module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define("Client", {
        email : {
            type: DataTypes.STRING,
            allowNull : false
        },
        password : {
            type: DataTypes.STRING,
            allowNull : false
        },
        phone : {
            type: DataTypes.STRING,
            allowNull : true
        },
        adress : {
            type: DataTypes.STRING,
            allowNull : true
        },
        admin : {
            type: DataTypes.BOOLEAN,
            allowNull : true,
            defaultValue: false
        }
    })

    Client.associate = (models) => {
        Client.hasMany(models.Cart)
    }

    return Client
}