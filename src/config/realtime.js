import { onValue, ref, remove, set } from 'firebase/database';

import { realTimeDb } from './firebase-config';
import { isEqual } from 'lodash';
export const initRealtime = conn_plc => {
  let write_value = null;

  function writeUserData(path, dataFromPLC) {
    set(ref(realTimeDb, path), dataFromPLC);
  }

  // ĐỌC DỮ LIỆU TỪ PLC VÀ ĐƯA VÀO MẢNG - MỖI GIÂY 1 LẦN
  setInterval(() => {
    console.log('-----------READ DATA FROM PLC-------------');
    conn_plc.readAllItems((error, values) => {
      if (error) {
        console.log('Error occurred when reading data: ');
      }
      // Ban đầu ghi vào cả vùng nhớ của XLNT_WEB
      if (write_value === null) {
        write_value = { ...values };
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

  onValue(ref(realTimeDb, 'XLNT_WEB'), snapshot => {
    const data = snapshot.val();
    // Không ghi dữ liệu khi khởi tạo lần đầu
    if (write_value !== null) {
      // Vì mỗi lần dữ liệu thay đổi, snapshot sẽ chạy 2 lần để so sánh, chỉ ghi dữ liệu khi bắt được dữ liệu mới
      if (isEqual(write_value, data)) {
        console.log('===> DATA NOT CHANGED');
      } else {
        console.log('===> DATA CHANGED');
        console.log('-----------WRITE DATA TO PLC-------------');
        conn_plc.writeItems(
          Object.keys(data),
          Object.values(data),
          valuesWritten
        );
      }
      write_value = { ...data };
    }
  });
};
