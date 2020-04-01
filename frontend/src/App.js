import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Slider, Grid, IconButton } from '@material-ui/core';
import moment from 'moment'

import Maps from './components/Maps';
import Control from './components/Control';
import Label from './components/Label';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Replay10Icon from '@material-ui/icons/Replay10';
import Forward10Icon from '@material-ui/icons/Forward10';

const useStyles = makeStyles(theme => ({
  
}));

const App = () => {

  const [time, setTime] = useState(null);
  const [count, setCount] = useState(1);
  const countRef = useRef(count);
  const [pause, setPause] = useState(true);
  const [mapSync, setMapSync] = useState(true);
  
  const classes = useStyles();

  useEffect(() => {
    setTime(new moment());
  }, []);

  useEffect(() => {
    if (pause) {
      return;
    }
    if (count < 0) {
      setCount(0);
    }
    if (count > 18) {
      setCount(1);
    }
    const intervalId = setInterval(() => {
      setCount(count + 1);
    }, 700);
    return () => clearInterval(intervalId);
  }, [count, pause]);

  return (
    <div>
      <Maps mapSync={mapSync} />
      <Control mapSync={mapSync} setMapSync={setMapSync}/>
      <Label />
    </div>
  );
}

export default App;
