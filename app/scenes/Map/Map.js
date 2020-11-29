import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";

import MapView, { Marker } from "react-native-maps";
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import Icon from "react-native-vector-icons/MaterialIcons";

import { useAuth } from "../../providers/auth";

export default function Map(props) {
  const { navigate, replace } = props.navigation;
  const { state } = useAuth();
  const user = state.user;

  // const [position, setPosition] = useState({
  //   latitude: -22.783640,
  //   longitude: -47.295551,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421,
  // });

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


  if (!currentRegion) {
    return null;
  }

  if (user.contacts.length) {

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        // initialRegion={currentRegion}
        showsUserLocation={true}
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
        <TextInput 
            style={styles.searchInput}
            placeholder="Buscar..."
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value=""
            onChangeText={() => {}}
          />
          <TouchableOpacity onPress={() => {}} style={styles.loadButton}>
            <Icon name="search" size={20} color="#FFF" />
          </TouchableOpacity>
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
