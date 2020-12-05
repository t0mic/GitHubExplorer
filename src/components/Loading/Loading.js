import React from 'react';
import AutorenewIcon from '@material-ui/icons/Autorenew';

import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.root}>
        <AutorenewIcon />
    </div>
  );
}
export default Loading;