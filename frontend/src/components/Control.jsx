import React, { useEffect, useRef, useState } from "react";
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Slider, Checkbox, IconButton, FormControlLabel, Typography, Tooltip, Divider, Select, MenuItem } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import moment from 'moment'
import { DateTimePicker } from "@material-ui/pickers";

import { getMetricsDataRequest, getImagesDataRequest, setCountTimeRequest } from '../store/actions/data';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Replay10Icon from '@material-ui/icons/Replay10';
import Forward10Icon from '@material-ui/icons/Forward10';
import ImageIcon from '@material-ui/icons/Image';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';

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
  toggle: {
    margin: theme.spacing(0.5),
    border: 'none',
    padding: theme.spacing(0, 1),
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
  toggleRoot: {
    backgroundColor: 'rgba(62, 62, 62, 0.25)',
  },
  toggleLabel: {
    color: '#FFF'
  },
  toggleSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.25) !important'
  },
  toggleRootBtn: {
    // height: 85
  },
  searchBtn: {
    borderColor: 'white',
    color: 'white',
    '&:hover': {
      borderColor: 'white',
      backgroundColor: 'white',
      color: 'black',
    },
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
  const [time, setTime] = useState(new Date(2019, 9, 12, 0, 0, 0, 0));
  const [count, setCount] = useState(0);
  const [pause, setPause] = useState(true);
  const cellHeight = 150;

  useEffect(() => {
    if (pause) {
      return;
    }
    if (count < 0) {
      setCount(0);
      props.setCountTimeRequest({ count: 0 });
    }
    if (count > 17) {
      setCount(1);
      props.setCountTimeRequest({ count: 1 });
    }
    const intervalId = setInterval(() => {
      setCount(count + 1);
      props.setCountTimeRequest({ count: count + 1 });
    }, 750);
    return () => clearInterval(intervalId);
  }, [count, pause]);

  useEffect(() => {
    const dt = moment(time).format('YYYYMMDD_HHmm');
    props.getImagesDataRequest({ dt });
    props.getMetricsDataRequest({ dt });
  }, [])

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      display: 'flex',
      flexDirection: 'row'
    }}>
      <div style={{ flex: 2, padding: 10 }}>
        <div className={classes.box} style={{
          padding: 20,
          height: cellHeight,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          <DateTimePicker
            disableFuture
            minDate={new Date(2019, 9, 12, 0, 0, 0, 0)}
            maxDate={new Date(2019, 9, 12, 23, 50, 0, 0)}
            minutesStep={10}
            label='Start Date and Time'
            inputVariant='outlined'
            value={time}
            onChange={setTime}
            className={classes.picker}
            InputProps={{ className: classes.pickerInput }}
            format='ddd DD MMM YYYY HH:mm'
          />
          <Button
            variant='outlined'
            color='primary'
            startIcon={<ImageSearchIcon />}
            className={classes.searchBtn}
            size='large'
            onClick={() => {
              if (time != null) {
                const dt = moment(time).format('YYYYMMDD_HHmm');
                props.getImagesDataRequest({ dt });
                props.getMetricsDataRequest({ dt });
                setCount(0);
              }
            }}
          >
            {'Display'}
          </Button>
        </div>
      </div>
      <div style={{ flex: 2, padding: 10 }}>
        <div className={classes.box} style={{
          padding: 20,
          height: cellHeight,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <ToggleButtonGroup
            classes={{
              grouped: classes.toggle,
              root: classes.toggleRoot
            }}
            value={props.multiView}
            exclusive
            onChange={(event, value) => {
              if (value != null) {
                props.setMultiView(value);
              }
            }}
          >
            <ToggleButton
              value='single'
              classes={{
                label: classes.toggleLabel,
                selected: classes.toggleSelected,
                root: classes.toggleRootBtn
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <ImageIcon />
                <span style={{ marginLeft: 5 }}>Single View</span>
              </div>
            </ToggleButton>
            <ToggleButton
              value='multi'
              classes={{
                label: classes.toggleLabel,
                selected: classes.toggleSelected,
                root: classes.toggleRootBtn
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <PhotoLibraryIcon />
                <span style={{ marginLeft: 5 }}>Multi View</span>
              </div>
            </ToggleButton>
          </ToggleButtonGroup>
          {props.multiView == 'single' &&
            <>
              <Typography variant='body1' style={{ color: '#FFF', marginTop: 10, fontWeight: 500 }}>
                {`Image Type`}
              </Typography>
              <ToggleButtonGroup
                classes={{
                  grouped: classes.toggle,
                  root: classes.toggleRoot
                }}
                value={props.mapView}
                exclusive
                onChange={(event, value) => {
                  if (value != null) {
                    props.setMapView(value);
                  }
                }}
              >
                <ToggleButton
                  value='gt'
                  classes={{
                    label: classes.toggleLabel,
                    selected: classes.toggleSelected,
                    root: classes.toggleRootBtn
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <AspectRatioIcon />
                    <span style={{ marginLeft: 5 }}>Label</span>
                  </div>
                </ToggleButton>
                <ToggleButton
                  value='pred'
                  classes={{
                    label: classes.toggleLabel,
                    selected: classes.toggleSelected,
                    root: classes.toggleRootBtn
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <SettingsOverscanIcon />
                    <span style={{ marginLeft: 5 }}>Prediction</span>
                  </div>
                </ToggleButton>
              </ToggleButtonGroup>
            </>
          }
          {props.multiView == 'multi' &&
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.mapSync}
                  onChange={(event) => props.setMapSync(event.target.checked)}
                />
              }
              label='Syncing between two maps'
              style={{ color: 'white' }}
            />
          }
        </div>
      </div>
      <div style={{ flex: 3, padding: 10 }}>
        <div className={classes.box} style={{
          padding: 20,
          height: cellHeight,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {/* <div style={{ height: 30, width: '100%' }} /> */}
          <Typography variant='h6' style={{ color: '#FFF' }}>
            {time != null && moment(time).add(count * 10, 'minutes').format('ddd DD MMM YYYY HH:mm')}
          </Typography>
          <Slider
            value={count}
            min={0}
            step={1}
            max={17}
            ValueLabelComponent={ValueLabelComponent}
            valueLabelFormat={(value) => {
              if (time != null)
                return moment(time).add(value * 10, 'minutes').format('ddd DD MMM YYYY HH:mm');
              else
                return '';
            }}
          // valueLabelDisplay="on"
          />
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
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
      <div style={{ flex: 4, padding: 10 }}>
        <div className={classes.box} style={{
          padding: 20,
          height: cellHeight,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          overflow: 'auto'
        }}>
          {(props.metrics == null) &&
            <Typography variant='h5' style={{ color: '#FFF' }}>
              {'<โปรดเลือกช่วงเวลา>'}
            </Typography>
          }
          {(props.metrics != null) &&
            <>
              <div style={{
                flex: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                height: '100%',
                marginButtom: 10,
                overflow: 'auto'
              }}>
                {['All RMSE', 'Rain RMSE', 'Non-Rain RMSE'].map((v, i) => (
                  <Typography key={'rm_' + i} variant='h6' style={{ color: '#FFF' }}>
                    {`${v}: ${props.metrics['rmse'][i].toFixed(2)}`}
                  </Typography>
                ))}
                {['Binary CSI', 'Micro CSI', 'Macro CSI', 'Non Rain CSI',
                  'Light Rain CSI', 'Moderate Rain CSI', 'Heavy Rain CSI'].map((v, i) => (
                    <Typography key={'cs_' + i} variant='h6' style={{ color: '#FFF' }}>
                      {`${v}: ${props.metrics['csi'][i].toFixed(2)}`}
                    </Typography>
                  ))}
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loadingMetrics: state.data.loadingMetrics,
    metrics: state.data.metrics,
  }
}
export default connect(mapStateToProps, { getMetricsDataRequest, getImagesDataRequest, setCountTimeRequest })(Control);
