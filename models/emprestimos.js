'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class emprestimos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      emprestimos.belongsTo(models.usuarios, {
        foreignKey: "usuario_id"
      })
      emprestimos.belongsTo(models.livros, {
        foreignKey: "livro_id"
      })
      emprestimos.hasMany(models.historico_emprestimos, {
        foreignKey: "emprestimo_id"
      })
    }
  }
  emprestimos.init({
    data_emprestimo: DataTypes.DATE,
    data_devolucao: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'emprestimos',
  });
  return emprestimos;
};