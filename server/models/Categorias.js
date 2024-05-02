module.exports = (sequelize, DataTypes) => {
    const Categorias = sequelize.define("Categorias", {
        categorias : {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    Categorias.associate = (models) => {
        Categorias.hasMany(models.Products, {
            onDelete: "cascade"
        })
    }

    return Categorias
}
