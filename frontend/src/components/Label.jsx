import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Slider, Grid, Typography } from '@material-ui/core';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  box: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
    width: 'fit-content',
    margin: '0 auto'
  },
  labelText: {
    color: 'white',
    textAlign: 'center',
    margin: 10,
    fontWeight: 400
  }
}));

const Label = (props) => {

  const classes = useStyles();

  return (
    <div style={{
      position: 'absolute',
      bottom: 30,
      left: 0,
      width: '100%',
      display: 'inline-flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {((props.multiView == 'multi') || (props.mapView == 'gt')) &&
        <div style={{ flex: 1 }}>
          <div className={classes.box}>
            <Typography variant='h4' className={classes.labelText}>
              {'Ground Truth'}
            </Typography>
          </div>
        </div>
      }
      {((props.multiView == 'multi') || (props.mapView == 'pred')) &&
        <div style={{ flex: 1 }}>
          <div className={classes.box}>
            <Typography variant='h4' className={classes.labelText}>
              {'Prediction'}
            </Typography>
          </div>
        </div>
      }
    </div>
  );
}

export default Label;
