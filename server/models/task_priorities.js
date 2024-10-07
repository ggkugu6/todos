const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('task_priorities', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "task_priorities_name_key"
    }
  }, {
    sequelize,
    tableName: 'task_priorities',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "task_priorities_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "task_priorities_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
