import { onValue, ref, remove, set } from 'firebase/database';

import { realTimeDb } from './firebase-config';

export const initRealtime = conn_plc => {
  let write_value = null;

  function writeUserData(path, dataFromPLC) {
    set(ref(realTimeDb, path), dataFromPLC);
  }

  // ĐỌC DỮ LIỆU TỪ PLC VÀ ĐƯA VÀO MẢNG - MỖI GIÂY 1 LẦN
  setInterval(() => {
    console.log('-----------READ PLC-------------');
    conn_plc.readAllItems((error, values) => {
      if (error) {
        console.log('Error occurred when reading data: ');
      }
      if (write_value === null) {
        console.log('---------------------');
        console.log('write_XLNT_WEB');
        write_value = { ...values };
        // remove(ref(realTimeDb, 'XLNT_WEB'));
        // remove(ref(realTimeDb, 'XLNT_WEB'));
        writeUserData('XLNT_WEB', values);
      }
      writeUserData('XLNT_PLC', values);
    });
  }, 1000);

  // HÀM CALLBACK GHI DỮ LIỆU XUỐNG PLC
  function valuesWritten(anythingBad, values) {
    if (anythingBad) {
      console.log('SOMETHING WENT WRONG WRITING VALUES!!!!');
    }
    console.log('Done writing.');
  }

  // const starCountRef = ref(realTimeDb, 'XLNT_WEB');
  onValue(ref(realTimeDb, 'XLNT_WEB'), snapshot => {
    const data = snapshot.val();
    // console.log('data:', data);
    // console.log('write_value:', write_value);
    if (write_value !== null) {
      console.log('-----------WRITE PLC-------------');
      if (write_value.tagBool !== data.tagBool) {
        conn_plc.writeItems('tagBool', data.tagBool, valuesWritten);
      }
      if (write_value.tagByte !== data.tagByte) {
        conn_plc.writeItems('tagByte', data.tagByte, valuesWritten);
      }
      if (write_value.tagInteger !== data.tagInteger) {
        conn_plc.writeItems('tagInteger', data.tagInteger, valuesWritten);
      }
      if (write_value.tagReal !== data.tagReal) {
        conn_plc.writeItems('tagReal', data.tagReal, valuesWritten);
      }
      if (write_value.tagString !== data.tagString) {
        conn_plc.writeItems('tagString', data.tagString, valuesWritten);
      }
      write_value = { ...data };
    }
  });
};
