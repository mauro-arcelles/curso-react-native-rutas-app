import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import LoadingScreen from '../pages/LoadingScreen';
import Fab from './Fab';


const Map = () => {

  const {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
    stopFollowUserLocation,
    routeLines
  } = useLocation();

  const [showPolyline, setShowPolyline] = useState(true);

  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);

  const centerPosition = async () => {
    following.current = true;
    const location = await getCurrentLocation();
    mapViewRef.current?.animateCamera({
      center: {
        latitude: location.latitude,
        longitude: location.longitude,
      }
    });
  };

  useEffect(() => {
    followUserLocation();

    return () => {
      stopFollowUserLocation();
    };
  }, []);

  useEffect(() => {
    if (!following.current) return;
    const { latitude, longitude } = userLocation;
    mapViewRef.current?.animateCamera({
      center: {
        latitude,
        longitude,
      }
    });
  }, [userLocation]);

  if (!hasLocation) {
    return <LoadingScreen/>;
  }

  return (
    <>
      <MapView
        ref={(el) => mapViewRef.current = el!}
        showsUserLocation
        showsMyLocationButton={false}
        initialRegion={{
          latitude: initialPosition!.latitude,
          longitude: initialPosition!.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        minZoomLevel={16}
        style={{ flex: 1 }}
        onTouchStart={() => following.current = false}
      >
        {showPolyline &&
          <Polyline
            coordinates={routeLines}
            strokeColor={'black'}
            strokeWidth={3}
          />
        }
        {/*<Marker*/}
        {/*  image={require('../assets/custom-marker.png')}*/}
        {/*  coordinate={{*/}
        {/*    latitude: 37.78825,*/}
        {/*    longitude: -122.4324,*/}
        {/*  }}*/}
        {/*  title="Esto es un marcador"*/}
        {/*  description="Esto es una descripcion del marcador"*/}
        {/*/>*/}
      </MapView>

      <Fab
        iconName="compass-outline"
        onPress={centerPosition}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
      />

      <Fab
        iconName="brush-outline"
        onPress={() => setShowPolyline(!showPolyline)}
        style={{
          position: 'absolute',
          bottom: 80,
          right: 20,
        }}
      />
    </>
  );
};

export default Map;
