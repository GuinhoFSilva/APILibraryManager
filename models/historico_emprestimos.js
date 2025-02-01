'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class historico_emprestimos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      historico_emprestimos.belongsTo(models.emprestimos, {
        foreignKey: "emprestimo_id"
      })
    }
  }
  historico_emprestimos.init({
    data_devolucao: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'historico_emprestimos',
  });
  return historico_emprestimos;
};