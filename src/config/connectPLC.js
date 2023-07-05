import dotenv from 'dotenv';
dotenv.config();

export const tags_list = {
  T_On_Pump_Min: 'DB2,INT0.2',
  T_Off_Pump_Min: 'DB2,INT4.2',
  T_On_Fan_Min: 'DB2,INT8.2',
  T_Off_Fan_Min: 'DB2,INT12.2',
  T_On_Pump_MS: 'DB2,INT16.2',
  T_Off_Pump_MS: 'DB2,INT20.2',
  T_On_Fan_MS: 'DB2,INT24.2',
  T_Off_Fan_MS: 'DB2,INT28.2',
  T_Sum_Pump1_Min: 'DB2,INT32.2',
  T_Sum_Pump2_Min: 'DB2,INT36.2',
  T_Sum_Fan_Min: 'DB2,INT40.2',
  T_Left_On_Pump1_Sec: 'DB2,INT44.2',
  T_Left_On_Pump2_Sec: 'DB2,INT48.2',
  T_Left_Off_Pump_Sec: 'DB2,INT52.2',
  T_Left_On_Fan_Sec: 'DB2,INT56.2',
  T_Left_Off_Fan_Sec: 'DB2,INT60.2',
  Reset_T_Sum_Pump1: 'DB2,X64.0',
  Reset_T_Sum_Pump2: 'DB2,X64.1',
  Reset_T_Sum_Fan: 'DB2,X64.2',
  Status_Pump1: 'DB2,X64.3',
  Status_Pump2: 'DB2,X64.4',
  Status_Fan: 'DB2,X64.5',
  Status_Buoy: 'DB2,X64.6',
  Error_Pump1: 'DB2,X64.7',
  Error_Pump2: 'DB2,X65.0',
  Error_Fan: 'DB2,X65.1',
  Reset_Buzz: 'DB2,X65.2',
};

export const tags_key = Object.keys(tags_list);

export const connectPLC = conn_plc => {
  // Tạo địa chỉ kết nối (slot = 2 nếu là 300/400, slot = 1 nếu là 1200/1500)
  conn_plc.initiateConnection(
    { port: 102, host: process.env.PLC_HOST_ID, rack: 0, slot: 1 },
    PLC_connected
  );

  // GỬI DỮ LIỆu TAG CHO PLC
  function PLC_connected(err) {
    if (typeof err !== 'undefined') {
      console.log(err); // Hiển thị lỗi nếu không kết nối được với PLC
    }
    conn_plc.setTranslationCB(function (tag) {
      return tags_list[tag];
    }); // Đưa giá trị đọc lên từ PLC và mảng

    // conn_plc.addItems([
    //   'tagBool',
    //   'tagByte',
    //   'tagInteger',
    //   'tagReal',
    //   'tagString',
    // ]);
    conn_plc.addItems(tags_key);
  }
};
