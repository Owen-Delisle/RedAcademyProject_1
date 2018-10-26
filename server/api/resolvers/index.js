/**
 *  @TODO: Handling Server Errors
 *
 *  Once you've completed your pg-resource.js methods and handled errors
 *  use the ApolloError constructor to capture and return errors from your resolvers.
 *
 *  Throwing ApolloErrors from your resolvers is a nice pattern to follow and
 *  will help you easily debug problems in your resolving functions.
 *
 *  It will also help you control th error output of your resource methods and use error
 *  messages on the client! (More on that later).
 *
 *  The user resolver has been completed as an example of what you'll need to do.
 *  Finish of the rest of the resolvers when you're ready.
 */
const { ApolloError } = require('apollo-server-express');

//Owen Delisle

// @TODO: Uncomment these lines later when we add auth
const jwt = require('jsonwebtoken');
const authMutations = require('./auth');
// -------------------------------
const { UploadScalar, DateScalar } = require('../custom-types');

module.exports = app => {
  return {
    // Upload: UploadScalar,
    // Date: DateScalar,

    Query: {
      viewer(root, args, context) {
        context.token;
        /**
         * @TODO: Authentication - Server
         *
         *  If you're here, you have successfully completed the sign-up and login resolvers
         *  and have added the JWT from the HTTP cookie to your resolver's context.
         *
         *  The viewer is what we're calling the current user signed into your application.
         *  When the user signed in with their username and password, an JWT was created with
         *  the user's information cryptographically encoded inside.
         *
         *  To provide information about the user's session to the app, decode and return
         *  the token's stored user here. If there is no token, the user has signed out,
         *  in which case you'll return null
         */
        return null;
      },
      //Get user by ID
      async user(parent, { id }, { pgResource }, info) {
        try {
          const user = await pgResource.getUserById(id);
          return user;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      //Get Items that != User ID
      async items(parent, { filter }, { pgResource }) {
        try {
          const item = pgResource.getItems(filter);
          return item;
        } catch (error) {
          throw new ApolloError();
        }
      },
      async item(parent, { id }, { pgResource }) {
        const item = pgResource.getItemById(id);
        return item;
      },
      //Get Tags
      async tags(parent, { id }, { pgResource }) {
        try {
          return pgResource.getTags();
        } catch (error) {
          throw new ApolloError();
        }
      }
    },

    User: {
      //Get items owned by specififc user
      items(root, _, { pgResource }) {
        try {
          return pgResource.getItemsForUser(root.id);
        } catch (error) {
          new ApolloError();
        }
      },
      //Get items borrowed by user
      borrowed(root, _, { pgResource }) {
        try {
          return pgResource.getBorrowedItemsForUser(root.id);
        } catch (error) {
          new ApolloError();
        }
      }
    },

    Item: {
      //Get user that owns item
      async ownerid(root, _, { pgResource }) {
        try {
          return pgResource.getUserById(root.ownerid);
        } catch (error) {
          new ApolloError();
        }
      },
      //Get Tags for item
      async tags(root, _, { pgResource }) {
        try {
          return pgResource.getTagsForItem(root.id);
        } catch (error) {
          new ApolloError();
        }
      },
      //Get user that borrows item
      async borrower(root, _, { pgResource }) {
        try {
          return pgResource.getUserById(root.borrowerid);
        } catch (error) {
          new ApolloError();
        }
      }
      // async imageurl({ imageurl, imageid, mimetype, data }) {
      //   if (imageurl) return imageurl
      //   if (imageid) {
      //     return `data:${mimetype};base64, ${data}`
      //   }
      // }
      // -------------------------------
    },

    Mutation: {
      // @TODO: Uncomment this later when we add auth
      ...authMutations(app),
      // -------------------------------

      async addItem(parent, args, { pgResource }, context, info) {
        /**
         *  @TODO: Destructuring
         *
         *  The 'args' and 'context' parameters of this resolver can be destructured
         *  to make things more readable and avoid duplication.
         *
         *  When you're finished with this resolver, destructure all necessary
         *  parameters in all of your resolver functions.
         *
         *  Again, you may look at the user resolver for an example of what
         *  destructuring should look like.
         */

        // image = await image;
        const user = await jwt.decode(context.token, app.get('JWT_SECRET'));
        const newItem = await context.pgResource.saveNewItem({
          item: args.item,
          // image: args.image,
          user
        });
        return newItem;
      }
    }
  };
};
