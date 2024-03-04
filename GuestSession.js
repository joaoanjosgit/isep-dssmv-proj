import {
  DEFAULT_URL,
  API_KEY,
  fetchGuestSessionStarted,
  fetchGuestSession,
} from './context/Actions';
import React, {useState, useEffect, useContext} from 'react';
import AppContext from './context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function _storeData(value) {
  try {
    await AsyncStorage.setItem('guest', value);
  } catch (error) {
    // Error saving data
  }
}

async function _retrieveData() {
  try {
    const value = await AsyncStorage.getItem('guest');
    if (value !== null) {
      // We have data!!

      return value;
    }
  } catch (error) {
    // Error retrieving data
  }
}

const GuestSession = props => {
  const {state, dispatch} = useContext(AppContext);
  const [token, setToken] = useState();
  const [flag, setFlag] = useState();
  const {guestSession} = state;
  const {guestSessionData} = guestSession;
  const {navigation} = props;
  _retrieveData().then(r => {
    setFlag(r);
  });
  useEffect(() => {
    if (flag === undefined) {
      dispatch(fetchGuestSessionStarted());

      const sessionUrl =
        DEFAULT_URL + '/authentication/guest_session/new' + API_KEY;
      const sessionRequest = {};

      fetchGuestSession(sessionUrl, sessionRequest, dispatch);

      _storeData(guestSessionData.guest_session_id).then(() => {
        setToken(guestSessionData.guest_session_id);
      });
    } else {
    }
  }, []);

  //console.log('break');
  //console.log(flag);
};

export default GuestSession;
