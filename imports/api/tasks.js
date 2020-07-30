import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
const Tasks = new Mongo.Collection("tasks");

Meteor.methods({
  "task.insert"({ text }) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    Tasks.insert({
      text: text.trim(),
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },

  "task.remove"({ taskId }) {
    check(taskId, String);
    const task = Tasks.findOne(taskId);

    if (!this.userId || task.owner !== this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    Tasks.remove(taskId);
  },

  "task.setChecked"({ taskId, isChecked }) {
    check(taskId, String);
    check(isChecked, Boolean);

    const task = Tasks.findOne(taskId);

    if (task.isPrivate && task.owner !== this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    Tasks.update(taskId, {
      $set: {
        isChecked,
      },
    });
  },

  "tasks.setPrivate"({ taskId, isPrivate }) {
    check(taskId, String);
    check(isPrivate, Boolean);

    const task = Tasks.findOne(taskId);

    if (!this.userId || task.owner !== this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    Tasks.update(taskId, {
      $set: {
        isPrivate,
      },
    });
  },
});

if (Meteor.isServer) {
  Meteor.publish("tasks", function () {
    return Tasks.find({
      $or: [{ private: { $ne: true } }, { owner: this.userId }],
    });
  });
}

export default Tasks;
