const db = require('./database');
const Sequelize = require('sequelize');

// Make sure you have `postgres` running!

//---------VVVV---------  your code below  ---------VVV----------

const Task = db.define('Task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  due: Sequelize.DATE,
});

const Owner = db.define('Owner', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Task.belongsTo(Owner);
Owner.hasMany(Task);

Task.clearCompleted = async function () {
  await Task.destroy({
    where: {
      complete: true,
    },
  });
};

Task.completeAll = async function () {
  let incomplete = await Task.findAll({
    where: {
      complete: false,
    },
  });
  for (let i = 0; i < incomplete.length; i++) {
    await incomplete[i].update({ complete: true });
  }
};

Task.prototype.getTimeRemaining = function () {
  if (!this.due) return Infinity;
  return this.due - new Date();
};

Task.prototype.isOverdue = function () {
  return this.getTimeRemaining() < 0 && !this.complete ? true : false;
};

Task.prototype.assignOwner = async function (owner) {
  return this.setOwner(owner);
};

//---------^^^---------  your code above  ---------^^^----------

module.exports = {
  Task,
  Owner,
};
