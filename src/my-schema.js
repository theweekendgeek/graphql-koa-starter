const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    go: String!
    doSomething: String!
  }
  type Subscription {
    stat: String!
    info: String!
  }
`;
