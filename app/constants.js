import React from 'react';

//API URL
export const API_URL = 'https://sisters-api.herokuapp.com/api';
// export const API_URL = 'http://localhost:3000/api';
// export const API_URL = 'http://192.168.0.105:3000/api';


//API End Points
export const REGISTER = `${API_URL}/auth/register`;
export const LOGIN = `${API_URL}/auth/login`;
export const UPDATE_PROFILE = `${API_URL}/user`;
export const UPLOAD_IMAGE = `${API_URL}/user/upload`;
export const CONTACTS = `${API_URL}/user/contacts`;
export const FORGOT_PASSWORD = `${API_URL}/auth/recover`;

export const GOOGLE_GEOCODING="https://maps.googleapis.com/maps/api/geocode/json?"