import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Slider, Grid, IconButton } from '@material-ui/core';
import moment from 'moment'
import { DateTimePicker } from "@material-ui/pickers";

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Replay10Icon from '@material-ui/icons/Replay10';
import Forward10Icon from '@material-ui/icons/Forward10';

const useStyles = makeStyles(theme => ({
  box: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
  },
}));

const Control = (props) => {

  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      display: 'flex',
      flexDirection: 'row'
    }}>
      <div style={{ flex: 4, display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1, padding: 10 }}>
          <div className={classes.box} style={{
            height: 150,
          }}>
            <DateTimePicker
              label="DateTimePicker"
              inputVariant="outlined"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
        </div>
        <div style={{ flex: 1, padding: 10 }}>
          <div className={classes.box} style={{
            height: 150,
          }} />
        </div>
      </div>
      <div style={{ flex: 4 }}>
        <div style={{ padding: 10 }}>
          <div className={classes.box} style={{
            height: 150,
          }} />
        </div>
      </div>
    </div>
  );
}

export default Control;
