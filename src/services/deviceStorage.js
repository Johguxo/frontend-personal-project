import AsyncStorage from "@react-native-async-storage/async-storage";
import customAxios from "../axios";

const deviceStorage = {

  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('AsyncStorage Set Error: ' + error.message);
    }
  },

  async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value
    } catch (error) {
      console.log('AsyncStorage Get Error: ' + error.message);
    }
  },

  async loadData() {
    try {
      const data = await AsyncStorage.getItem('auth');
      const { token, idUser } = JSON.parse(data);
      if (token !== null) {
        customAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
        return {token, idUser};
      }
    } catch (error) {
      console.log('AsyncStorage Load Error: ' + error.message);
    }
  },

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log('AsyncStorage Remove Error: ' + error.message);
    }
  }
};

export default deviceStorage;