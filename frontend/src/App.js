import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Slider, Grid, IconButton } from '@material-ui/core';

import moment from 'moment'

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Replay5Icon from '@material-ui/icons/Replay5';
import Forward5Icon from '@material-ui/icons/Forward5';

const styles = {
  width: "100vw",
  height: "100vh",
  position: "absolute"
};

const useStyles = makeStyles(theme => ({
  box: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 10,
  }
}));

const App = () => {

  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const [time, setTime] = useState(null);
  const [count, setCount] = useState(1);
  const countRef = useRef(count);
  const [pause, setPause] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    setTime(new moment());
  }, []);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGVsaW9zNTU1IiwiYSI6ImNrNXFrYmY2ODAzY2czbHF2OWNrbXBsOHMifQ.DYFZZL8yUxkPQ_Uxu5zBfw';
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [138.2529, 36.2048],
        zoom: 5
      });

      map.on('load', () => {
        setMap(map);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  useEffect(() => {
    if (pause) {
      return;
    }
    if (count > 18) {
      setCount(1);
    }
    const intervalId = setInterval(() => {
      setCount(count + 1);
    }, 500);
    return () => clearInterval(intervalId);
  }, [count, pause]);

  return (
    <div>
      <div ref={el => (mapContainer.current = el)} style={styles} />
      <div className={classes.box} style={{
        width: 300,
        height: '50vh',
        top: 10,
        right: 10
      }} />
      <div className={classes.box} style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        bottom: 30,
        width: 400,
        height: 100,
      }} >
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ height: '100%' }}
        >
          <Grid item style={{ width: '60%' }}>
            <Slider
              value={count}
              min={1}
              step={1}
              max={18}
              valueLabelFormat={(value) => {
                if (time != null)
                 return moment(time).add(value*10, 'minutes').format('hh:mm');
                else
                  return '';
              }}
              valueLabelDisplay="on"
            />
          </Grid>
          <Grid
            item
            style={{ width: '100%' }}
          >
            <Grid container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <IconButton>
                  <Replay5Icon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={() => setPause(!pause)}>
                  {pause && <PlayArrowIcon />}
                  {!pause && <PauseIcon />}
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton>
                  <Forward5Icon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
