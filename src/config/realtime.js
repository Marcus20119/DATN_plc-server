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
      console.log('values:', values);
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

  // onValue(ref(realTimeDb, 'XLNT_WEB'), snapshot => {
  //   const data = snapshot.val();
  //   // Không ghi dữ liệu khi khởi tạo lần đầu
  //   if (write_value !== null) {
  //     // Vì mỗi lần dữ liệu thay đổi, snapshot sẽ chạy 2 lần để so sánh, chỉ ghi dữ liệu khi bắt được dữ liệu mới
  //     if (isEqual(write_value, data)) {
  //       console.log('===> DATA NOT CHANGED');
  //     } else {
  //       console.log('===> DATA CHANGED');
  //       console.log('-----------WRITE DATA TO PLC-------------');
  //       conn_plc.writeItems(
  //         Object.keys(data),
  //         Object.values(data),
  //         valuesWritten
  //       );
  //     }
  //     write_value = { ...data };
  //   }
  // });
  onValue(ref(realTimeDb, 'XLNT_WEB/Reset_T_Sum_Pump1'), snapshot => {
    const data = snapshot.val();
    if (write_value !== null) {
      // Vì mỗi lần dữ liệu thay đổi, snapshot sẽ chạy 2 lần để so sánh, chỉ ghi dữ liệu khi bắt được dữ liệu mới
      if (isEqual(write_value.Reset_T_Sum_Pump1, data)) {
        console.log('===> Reset_T_Sum_Pump1 NOT CHANGED');
      } else {
        console.log('===> Reset_T_Sum_Pump1 CHANGED');
        console.log('-----------WRITE DATA TO PLC-------------');
        conn_plc.writeItems('Reset_T_Sum_Pump1', data, valuesWritten);
      }
      write_value.Reset_T_Sum_Pump1 = data;
    }
  });
  onValue(ref(realTimeDb, 'XLNT_WEB/Reset_T_Sum_Pump2'), snapshot => {
    const data = snapshot.val();
    if (write_value !== null) {
      // Vì mỗi lần dữ liệu thay đổi, snapshot sẽ chạy 2 lần để so sánh, chỉ ghi dữ liệu khi bắt được dữ liệu mới
      if (isEqual(write_value.Reset_T_Sum_Pump2, data)) {
        console.log('===> Reset_T_Sum_Pump2 NOT CHANGED');
      } else {
        console.log('===> Reset_T_Sum_Pump2 CHANGED');
        console.log('-----------WRITE DATA TO PLC-------------');
        conn_plc.writeItems('Reset_T_Sum_Pump2', data, valuesWritten);
      }
      write_value.Reset_T_Sum_Pump2 = data;
    }
  });
  onValue(ref(realTimeDb, 'XLNT_WEB/Reset_T_Sum_Fan'), snapshot => {
    const data = snapshot.val();
    if (write_value !== null) {
      // Vì mỗi lần dữ liệu thay đổi, snapshot sẽ chạy 2 lần để so sánh, chỉ ghi dữ liệu khi bắt được dữ liệu mới
      if (isEqual(write_value.Reset_T_Sum_Fan, data)) {
        console.log('===> Reset_T_Sum_Fan NOT CHANGED');
      } else {
        console.log('===> Reset_T_Sum_Fan CHANGED');
        console.log('-----------WRITE DATA TO PLC-------------');
        conn_plc.writeItems('Reset_T_Sum_Fan', data, valuesWritten);
      }
      write_value.Reset_T_Sum_Fan = data;
    }
  });
  onValue(ref(realTimeDb, 'XLNT_WEB/T_On_Pump_Min'), snapshot => {
    const data = snapshot.val();
    if (write_value !== null) {
      // Vì mỗi lần dữ liệu thay đổi, snapshot sẽ chạy 2 lần để so sánh, chỉ ghi dữ liệu khi bắt được dữ liệu mới
      if (isEqual(write_value.T_On_Pump_Min, data)) {
        console.log('===> T_On_Pump_Min NOT CHANGED');
      } else {
        console.log('===> T_On_Pump_Min CHANGED');
        console.log('-----------WRITE DATA TO PLC-------------');
        conn_plc.writeItems('T_On_Pump_Min', data, valuesWritten);
      }
      write_value.T_On_Pump_Min = data;
    }
  });
  onValue(ref(realTimeDb, 'XLNT_WEB/T_Off_Pump_Min'), snapshot => {
    const data = snapshot.val();
    if (write_value !== null) {
      // Vì mỗi lần dữ liệu thay đổi, snapshot sẽ chạy 2 lần để so sánh, chỉ ghi dữ liệu khi bắt được dữ liệu mới
      if (isEqual(write_value.T_Off_Pump_Min, data)) {
        console.log('===> T_Off_Pump_Min NOT CHANGED');
      } else {
        console.log('===> T_Off_Pump_Min CHANGED');
        console.log('-----------WRITE DATA TO PLC-------------');
        conn_plc.writeItems('T_Off_Pump_Min', data, valuesWritten);
      }
      write_value.T_Off_Pump_Min = data;
    }
  });
  onValue(ref(realTimeDb, 'XLNT_WEB/T_On_Fan_Min'), snapshot => {
    const data = snapshot.val();
    if (write_value !== null) {
      // Vì mỗi lần dữ liệu thay đổi, snapshot sẽ chạy 2 lần để so sánh, chỉ ghi dữ liệu khi bắt được dữ liệu mới
      if (isEqual(write_value.T_On_Fan_Min, data)) {
        console.log('===> T_On_Fan_Min NOT CHANGED');
      } else {
        console.log('===> T_On_Fan_Min CHANGED');
        console.log('-----------WRITE DATA TO PLC-------------');
        conn_plc.writeItems('T_On_Fan_Min', data, valuesWritten);
      }
      write_value.T_On_Fan_Min = data;
    }
  });
  onValue(ref(realTimeDb, 'XLNT_WEB/T_Off_Fan_Min'), snapshot => {
    const data = snapshot.val();
    if (write_value !== null) {
      // Vì mỗi lần dữ liệu thay đổi, snapshot sẽ chạy 2 lần để so sánh, chỉ ghi dữ liệu khi bắt được dữ liệu mới
      if (isEqual(write_value.T_Off_Fan_Min, data)) {
        console.log('===> T_Off_Fan_Min NOT CHANGED');
      } else {
        console.log('===> T_Off_Fan_Min CHANGED');
        console.log('-----------WRITE DATA TO PLC-------------');
        conn_plc.writeItems('T_Off_Fan_Min', data, valuesWritten);
      }
      write_value.T_Off_Fan_Min = data;
    }
  });
};
