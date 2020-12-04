import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";

import { useSelector } from 'react-redux';

import MapView, { Marker } from "react-native-maps";
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import Icon from "react-native-vector-icons/MaterialIcons";
import Spinner from 'react-native-loading-spinner-overlay';

import { getGeocoding } from "../../services/auth";
import { useAuth } from "../../providers/auth";
import MapInput from "../../components/MapInput";
// import { getUserContactcs } from "../../reducers";

export default function Map(props) {
  const { navigate, replace } = props.navigation;
  const { state } = useAuth();
  const user = state.user;

  const [spinner, setSpinner ] = useState(false);
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    if (user.contacts.length) {

      async function loadInitialPosition() {
        let { status } = await requestPermissionsAsync();

        if (status === "granted") {

          const { coords } = await getCurrentPositionAsync({
            enableHighAccuracy: true,
          });
  
          const { latitude, longitude } = coords;

          setCurrentRegion({
            latitude,
            longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          })
          setSpinner(false);
        }
      }
      loadInitialPosition();
    }
  }, []);


  const getCurrentPosition = async () => {
    const { coords } = await getCurrentPositionAsync({
      enableHighAccuracy: true,
    });

    const { latitude, longitude } = coords;

    setCurrentRegion({
      latitude,
      longitude,
      latitudeDelta: 0.04,
      longitudeDelta: 0.04,
    })
  }


  const getLocation = async (placeID, details) => { 
    try {
      const result = await getGeocoding(placeID, "AIzaSyBZfLoLoy7y-2hQAvM32g0oF69cSKMBGAo");
      const location = result.data.results[0].geometry.location;
      
      setCurrentRegion({
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      })

    } catch (error) {
      console.log(error);
    }
  }


  if (!currentRegion && user.contacts.length) {
    return (
      <View>
        <Spinner 
          visible={spinner}
          textContent={'Loading...'}
        />
      </View>
    );
  }

  else if (currentRegion && user.contacts.length) {

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        // initialRegion={currentRegion}
        // showsUserLocation={true}
        region={currentRegion}
        provider="google"
        onPress={(e) =>
          setCurrentRegion({
            ...currentRegion,
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          })
        }
      >
        <Marker
          coordinate={currentRegion}
          title={"Marcador"}
          description={"Testando o marcador no mapa"}
        />
      </MapView>

      <View style={styles.searchForm}>
        <View style={{ flex: 1}}>
          <MapInput searchLocation={getLocation} />
        </View>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.phone} onPress={() => {}}>
          <Icon name="phone" color={"#fff"} size={30} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.locationButton} onPress={() => getCurrentPosition()}>
          <Icon name="my-location" color={"#fff"} size={30} />
        </TouchableOpacity>
      </View>
    </View>
   );
  }
  
  return navigate('Contacts', {id: user._id})

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row'
  },
  map: {
    height: "100%",
    width: "100%",
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  locationButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 150,
    marginTop: -85,
    width: 50,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 8,
  },
  phone: {
    backgroundColor: '#e74c3c',
    borderRadius: 150,
    marginTop: -85,
    width: 50,
    height: 50,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 8,
  },

  searchForm: {
    flex: 1,
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 2,
  },

  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8E4Dff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  }
});
