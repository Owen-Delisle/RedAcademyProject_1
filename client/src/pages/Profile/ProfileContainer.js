import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { ITEM_QUERY } from '../../apollo/queries';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';
import { ALL_ITEMS_QUERY } from '../../apollo/queries';
import { ViewerContext } from '../../context/ViewerProvider';
import Profile from './Profile';

// const GET_ITEMS = gql`
//   {
//     items(filter: 1) {
//       id
//       title
//       description
//     }
//   }
// `;

class ProfileContainer extends Component {
  viewer = {};
  render() {
    return (
      //   <Fragment>
      <ViewerContext.Consumer>
        {({ user }) => {
          console.log('User:', user);
          <Query query={ALL_USER_ITEMS_QUERY} variables={{ id: 1 }}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;
              if (data) {
                return <Profile items={data.items} />;
              }
            }}
          </Query>;
        }}
      </ViewerContext.Consumer>
      //   </Fragment>
    );
  }
}

export default ProfileContainer;
