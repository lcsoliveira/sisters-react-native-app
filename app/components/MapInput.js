import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyBxwrxPaiqEXCI1JC-mme0Tf0jB9tgtiWA',
        language: 'pt-BR',
      }}
    />
  );
};

export default GooglePlacesInput;