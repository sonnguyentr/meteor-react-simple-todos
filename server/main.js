import { Meteor } from "meteor/meteor";
import { LinksCollection } from "/imports/api/links";

import Tasks from "/imports/api/tasks";

function insertLink({ title, url }) {
  LinksCollection.insert({ title, url, createdAt: new Date() });
}

const insertTask = (task) => {
  Tasks.insert({ text: task });
};

Meteor.startup(() => {
  if (Tasks.find().count() === 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach(insertTask);
  }
  // If the Links collection is empty, add some data.
  if (LinksCollection.find().count() === 0) {
    insertLink({
      title: "Do the Tutorial",
      url: "https://www.meteor.com/tutorials/react/creating-an-app",
    });

    insertLink({
      title: "Follow the Guide",
      url: "http://guide.meteor.com",
    });

    insertLink({
      title: "Read the Docs",
      url: "https://docs.meteor.com",
    });

    insertLink({
      title: "Discussions",
      url: "https://forums.meteor.com",
    });
  }
});
