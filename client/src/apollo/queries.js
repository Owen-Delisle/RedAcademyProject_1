import gql from 'graphql-tag';

/**
 * Item and user-related queries and mutations.
 */

// const ItemFields = gql`
//   fragment ItemFields on Item {
//     # @TODO: Create a fragment to query the following fields for an item:
//     #
//     id
//     title
//     # imageurl
//     # description
//     # created
//     # tags (id and title fields)
//     # itemowner (id, fullname, email, and bio fields)
//     # borrower (id, fullname, email, and bio fields)
//     #
//     # See the Apollo docs for instructions on how to use fragments:
//     # https://www.apollographql.com/docs/angular/features/fragments.html
//   }
// `;

const ItemFields = gql`
  fragment ItemFields on Item {
    id
    title
    description
    date_created
    tags {
      id
      title
    }
    ownerid {
      fullname
      email
    }
  }
`;

export const ITEM_QUERY = gql`
  query item($id: ID!) {
    item(id: $id) {
      ...ItemFields
    }
  }
  ${ItemFields}
`;

// Query items (optionally by tag id) and return the ItemFields fragment.
export const ALL_ITEMS_QUERY = gql`
  query items($filter: ID) {
    items(filter: $filter) {
      ...ItemFields
    }
  }
  ${ItemFields}
`;

export const ALL_USER_ITEMS_QUERY = gql`
  query user($id: ID!) {
    user(id: $id) {
      items {
        ...ItemFields
      }
      borrowed {
        ...ItemFields
      }
    }
  }
  ${ItemFields}
`;

export const ALL_TAGS_QUERY = gql`
  query {
    tags {
      id
      title
    }
  }
`;

export const ADD_ITEM_MUTATION = gql`
  mutation addItem($item: NewItemInput!) {
    addItem(item: $item) {
      title
      description
      tags {
        id
        title
      }
    }
  }
`;

// /**
//  * Auth-related queries and mutations.
//  */

export const VIEWER_QUERY = gql`
  query {
    viewer {
      id
      email
      fullname
      bio
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signup($input: NewUserInsert!) {
    signup(input: $input) {
      id
      email
      fullname
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($input: Login!) {
    login(input: $input) {
      id
    }
  }
`;
