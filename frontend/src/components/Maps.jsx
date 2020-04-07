import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import syncMove from '@mapbox/mapbox-gl-sync-move';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGVsaW9zNTU1IiwiYSI6ImNrNXFrYmY2ODAzY2czbHF2OWNrbXBsOHMifQ.DYFZZL8yUxkPQ_Uxu5zBfw';

const useStyles = makeStyles(theme => ({
  box: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
  },
  map: {
    width: '100%',
    height: '100vh',
    flex: 1,
  }
}));

const bound = [[118.006, 20.005], [149.994, 60.9958]];
const imgBounds = [[118.006, 20.005], [149.994, 47.9958]];

const initializeMap = (setMap, mapContainer) => {

  const map = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/dark-v10',

  });

  map.fitBounds(bound);
  map.setMaxBounds(bound);

  map.on('load', () => {
    setMap(map);
    map.resize();
  });
};

const Maps = (props) => {

  const [gtMap, setGtMap] = useState(null);
  const gtMapContainer = useRef(null);
  const [predMap, setPredMap] = useState(null);
  const predMapContainer = useRef(null);
  const clearSync = useRef(null);

  const classes = useStyles();

  const syncMaps = () => {
    if ((predMap != null) && (gtMap != null)) {
      clearSync.current = syncMove(predMap, gtMap);
    }
  };

  const unSyncMaps = () => {
    if (clearSync.current != null) {
      clearSync.current();
      clearSync.current = null;
    }
  };

  useEffect(() => {
    unSyncMaps();
    if (props.mapSync == true) {
      syncMaps();
    }
  }, [props.mapSync, predMap, gtMap])

  useEffect(() => {
    if (!gtMap) initializeMap(setGtMap, gtMapContainer);
  }, [gtMap]);

  useEffect(() => {
    if (!predMap) initializeMap(setPredMap, predMapContainer);
  }, [predMap]);

  useEffect(() => {
    if (gtMap != null) gtMap.resize();
    if (predMap != null) predMap.resize();
  }, [props.mapView, props.multiView]);

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className={classes.map} ref={el => (gtMapContainer.current = el)} style={{ display: (props.multiView == 'multi') || (props.mapView == 'gt') ? null : 'none' }} />
        {props.multiView == 'multi' &&
          <div style={{ width: 4, height: '100vh', backgroundColor: '#ffe100' }} />
        }
        <div className={classes.map} ref={el => (predMapContainer.current = el)} style={{ display: (props.multiView == 'multi') || (props.mapView == 'pred') ? null : 'none' }} />
      </div>
    </div>
  );
}

export default Maps;
