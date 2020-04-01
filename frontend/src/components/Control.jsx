import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Slider, Checkbox, IconButton, FormControlLabel, Typography, Tooltip, Divider } from '@material-ui/core';
import moment from 'moment'
import { DateTimePicker } from "@material-ui/pickers";

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Replay10Icon from '@material-ui/icons/Replay10';
import Forward10Icon from '@material-ui/icons/Forward10';

const useStyles = makeStyles(theme => ({
  box: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    backdropFilter: 'blur(10px)'
  },
  pickerInput: {
    color: 'white'
  },
  picker: {
    color: 'white',
    '& label': {
      color: 'white',
    },
    '& label.Mui-focused': {
      color: 'white',
      fontWeight: 'bold'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#bfbfbf',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
    width: '100%',
    marginTop: 10,
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;
  return (
    <Tooltip arrow open={open} placement='top' title={(
      <div>
        <Typography variant='body1' style={{ color: '#FFF' }}>
          {value}
        </Typography>
      </div>
    )}>
      {children}
    </Tooltip>
  );
}


const Control = (props) => {

  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());
  const [time, setTime] = useState(null);
  const [count, setCount] = useState(1);
  const countRef = useRef(count);
  const [pause, setPause] = useState(false);
  const cellHeight = 110;

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
    }, 750);
    return () => clearInterval(intervalId);
  }, [count, pause]);

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
            padding: 20,
            height: cellHeight,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}>
            <DateTimePicker
              label='Start Date and Time'
              inputVariant='outlined'
              value={selectedDate}
              onChange={handleDateChange}
              className={classes.picker}
              InputProps={{ className: classes.pickerInput }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.mapSync}
                  onChange={(event) => props.setMapSync(event.target.checked)}
                />
              }
              label="Sync Two Map"
              style={{ color: 'white' }}
            />
          </div>
        </div>
        <div style={{ flex: 1, padding: 10 }}>
          <div className={classes.box} style={{
            padding: 20,
            height: cellHeight,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <div style={{ height: 30, width: '100%' }} />
            <Slider
              value={count}
              min={1}
              step={1}
              max={18}
              ValueLabelComponent={ValueLabelComponent}
              valueLabelFormat={(value) => {
                if (time != null)
                  return moment(time).add(value * 10, 'minutes').format('hh:mm');
                else
                  return '';
              }}
              valueLabelDisplay="on"
            />
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <IconButton onClick={() => setCount(count - 1)} style={{ color: 'white' }}>
                <Replay10Icon />
              </IconButton>
              <IconButton onClick={() => setPause(!pause)} style={{ color: 'white' }}>
                {pause && <PlayArrowIcon />}
                {!pause && <PauseIcon />}
              </IconButton>
              <IconButton onClick={() => setCount(count + 1)} style={{ color: 'white' }}>
                <Forward10Icon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <div style={{ flex: 4 }}>
        <div style={{ padding: 10 }}>
          <div className={classes.box} style={{
            padding: 20,
            height: cellHeight,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
            <div style={{
              flex: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'flex-start',
              height: '100%'
            }}>
              <Typography variant='body1' style={{ color: '#FFF' }}>
                {`All RMSE: ...`}
              </Typography>
              <Typography variant='body1' style={{ color: '#FFF' }}>
                {`Rain RMSE: ...`}
              </Typography>
              <Typography variant='body1' style={{ color: '#FFF' }}>
                {`NonRain RMSE: ...`}
              </Typography>
            </div>
            <Divider orientation='vertical' style={{ backgroundColor: 'white', marginLeft: 20, marginRight: 20 }} />
            <div style={{
              flex: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'flex-start',
              height: '100%'
            }}>
              <Typography variant='body1' style={{ color: '#FFF' }}>
                {`Binary CSI: ...`}
              </Typography>
              <Typography variant='body1' style={{ color: '#FFF' }}>
                {`Non Rain CSI: ...`}
              </Typography>
              <Typography variant='body1' style={{ color: '#FFF' }}>
                {`Light Rain CSI: ...`}
              </Typography>
              <Typography variant='body1' style={{ color: '#FFF' }}>
                {`Moderate Rain CSI: ...`}
              </Typography>
              <Typography variant='body1' style={{ color: '#FFF' }}>
                {`Heavy Rain CSI: ...`}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Control;