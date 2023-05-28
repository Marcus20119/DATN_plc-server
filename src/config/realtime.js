import { onValue, ref, set } from 'firebase/database';

import { realTimeDb } from './firebase-config';
import { isEqual } from 'lodash';
import { myAxios } from './axiosConfig';

export const initRealtime = conn_plc => {
  let write_value = null;
  let error_pump1_flag = true;
  let error_pump2_flag = true;
  let error_fan_flag = true;

  function writeUserData(path, dataFromPLC) {
    set(ref(realTimeDb, path), dataFromPLC);
  }
  // ĐỌC DỮ LIỆU TỪ PLC VÀ ĐƯA VÀO MẢNG - MỖI GIÂY 1 LẦN
  setInterval(() => {
    console.log('-----------READ DATA FROM PLC-------------');
    conn_plc.readAllItems((error, values) => {
      // console.log('values:', values);
      if (error) {
        console.log('Error occurred when reading data: ');
      }
      // Ban đầu ghi vào cả vùng nhớ của XLNT_WEB
      if (write_value === null) {
        write_value = { ...values };
        writeUserData('XLNT_WEB', values);
      }
      writeUserData('XLNT_PLC', values);

      if (values.Error_Pump1 && !error_pump1_flag) {
        myAxios.post('/p/add-new-error', {
          project_id: 1,
          error_message: 'Bơm 1 quá tải',
        });
      }
      if (values.Error_Pump2 && !error_pump2_flag) {
        myAxios.post('/p/add-new-error', {
          project_id: 1,
          error_message: 'Bơm 2 quá tải',
        });
      }
      if (values.Error_Fan && !error_fan_flag) {
        myAxios.post('/p/add-new-error', {
          project_id: 1,
          error_message: 'Quạt hút mùi quá tải',
        });
      }
      error_pump1_flag = values.Error_Pump1;
      error_pump2_flag = values.Error_Pump2;
      error_fan_flag = values.Error_Fan;
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

  const catchAndWriteSingleSignalToPLC = dataName => {
    onValue(ref(realTimeDb, `XLNT_WEB/${dataName}`), snapshot => {
      const data = snapshot.val();
      if (write_value !== null) {
        if (isEqual(write_value[dataName], data)) {
          console.log(`===> ${dataName} NOT CHANGED`);
        } else {
          console.log(`===> ${dataName} CHANGED`);
          console.log(`-----------WRITE ${dataName} TO PLC-------------`);
          conn_plc.writeItems(dataName, data, valuesWritten);
        }
        write_value[dataName] = data;
      }
    });
  };
  const catchAndWriteDoubleSignalToPLC = async (dataName1, dataName2) => {
    onValue(ref(realTimeDb, `XLNT_WEB`), async snapshot => {
      const data = snapshot.val();
      if (write_value !== null) {
        const data1 = data[dataName1];
        const data2 = data[dataName2];

        if (
          isEqual(write_value[dataName1], data1) &&
          isEqual(write_value[dataName2], data2)
        ) {
          console.log(`===> ${dataName1} AND ${dataName2} NOT CHANGED`);
        } else {
          console.log(`===> ${dataName1} OR ${dataName2} CHANGED`);
          console.log(
            `-----------WRITE ${dataName1} AND ${dataName2} TO PLC-------------`
          );
          conn_plc.writeItems(
            [dataName1, dataName2],
            [data1, data2],
            valuesWritten
          );
        }
        write_value[dataName1] = data1;
        write_value[dataName2] = data2;
      }
    });
  };

  catchAndWriteSingleSignalToPLC('Reset_T_Sum_Pump1');
  catchAndWriteSingleSignalToPLC('Reset_T_Sum_Pump2');
  catchAndWriteSingleSignalToPLC('Reset_T_Sum_Fan');
  catchAndWriteDoubleSignalToPLC('T_On_Pump_Min', 'T_Off_Pump_Min');
  catchAndWriteDoubleSignalToPLC('T_On_Fan_Min', 'T_Off_Fan_Min');
};
