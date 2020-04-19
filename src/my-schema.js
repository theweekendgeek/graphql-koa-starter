const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    go: String!
  }
  type Subscription {
    info: String!
  }
`;
