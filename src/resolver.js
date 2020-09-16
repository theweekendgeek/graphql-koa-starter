const { PubSub } = require("apollo-server-express");
const pubsub = new PubSub();

const TOPIC = "inTopic";
const SECOND_TOPIC = "state";

const infos = ["info1", "info2", "info3", "done"];

const publish = () => {
  setTimeout(
    () => infos.forEach((info) => pubsub.publish(TOPIC, { info: info })),
    1000
  );
};

const returnState = () => {
  setTimeout(
      () => infos.forEach((info) => pubsub.publish(SECOND_TOPIC, { stat: info })),
      1000
  );
}

module.exports = {
  Query: {
    go() {
      publish();
      return "going";
    },
    doSomething() {
      returnState();
      return "doing";
    }
  },

  Subscription: {
    stat: {
      subscribe: () => pubsub.asyncIterator([SECOND_TOPIC]),
    },
    info: {
      subscribe: () => pubsub.asyncIterator([TOPIC]),
    },

  },
};
