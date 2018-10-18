import { withStyles } from '@material-ui/core/styles';
import React from 'react';

import styles from './styles';

const Items = ({ classes, data }) => {
  return (
    <div>
      <p>
        {data.items.map(item => {
          return item.title + ': ' + item.description + '. ';
        })}
      </p>
    </div>
  );
};

export default withStyles(styles)(Items);
