'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class livros extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      livros.hasMany(models.emprestimos, {
        foreignKey: "livro_id"
      })
    }
  }
  livros.init({
    titulo: DataTypes.STRING,
    autor: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    data_publicacao: DataTypes.DATE,
    isbn: DataTypes.STRING,
    link_googlebooks: DataTypes.STRING,
    data_adicao: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'livros',
  });
  return livros;
};