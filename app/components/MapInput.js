import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = (props) => {

  const { searchLocation } = props;

  return (
    <GooglePlacesAutocomplete
      placeholder='Procurar'
      onPress={(data, details = null) => searchLocation(data.place_id, details)}
      query={{
        key: 'AIzaSyBxwrxPaiqEXCI1JC-mme0Tf0jB9tgtiWA',
        language: 'pt-BR',
      }}
    />
  );
};

export default GooglePlacesInput;