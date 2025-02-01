'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('emprestimos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuario_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'usuarios', key: 'id'}
      },
      livro_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'livros', key: 'id'}
      },
      data_emprestimo: {
        type: Sequelize.DATEONLY
      },
      data_devolucao: {
        type: Sequelize.DATEONLY
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: [['pendente', 'devolvido', 'danificado']]
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('emprestimos');
  }
};