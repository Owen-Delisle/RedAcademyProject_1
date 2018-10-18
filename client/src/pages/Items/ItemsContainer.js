import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Items from './Items';
import { ITEM_QUERY } from '../../apollo/queries';

const GET_ITEMS = gql`
  {
    items(filter: 1) {
      id
      title
      description
    }
  }
`;

class ItemsContainer extends Component {
  render() {
    console.log({ GET_ITEMS });
    console.log({ ITEM_QUERY });
    return (
      <Query query={ITEM_QUERY} variables={{ filter: 1 }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          if (data) return <Items data={data} />;
        }}
      </Query>
    );
  }
}

export default ItemsContainer;