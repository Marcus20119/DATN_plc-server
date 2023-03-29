import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCUmhmOTGmeSkHef5Nlk7MhAtZi2SEs19M',
  authDomain: 'plc-webserver-realtime.firebaseapp.com',
  databaseURL:
    'https://plc-webserver-realtime-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'plc-webserver-realtime',
  storageBucket: 'plc-webserver-realtime.appspot.com',
  messagingSenderId: '88950979546',
  appId: '1:88950979546:web:f4cf3d2fb8982d3b98dee3',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Init service
export const realTimeDb = getDatabase(app);
