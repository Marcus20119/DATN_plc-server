import dotenv from 'dotenv';
dotenv.config();

export const tags_list = {
  // tagBool: 'DB1,X0.0',
  // tagByte: 'DB1,BYTE1',
  // tagInteger: 'DB1,INT2',
  // tagReal: 'DB1,REAL4',
  // tagString: 'DB1,S8.30',
  BtnOn1: 'DB16,X0.0',
  BtnOn2: 'DB16,X0.1',
  BtnOn3: 'DB16,X0.2',
  BtnOff: 'DB16,X0.3',
  AUTO: 'DB16,X0.4',
  MANUAL: 'DB16,X0.5',
  OR1: 'DB16,X0.6',
  OR2: 'DB16,X0.7',
  OR3: 'DB16,X1.0',
  T_run: 'DB16,INT2.2',
  MTK1: 'DB17,X0.0',
  MTK2: 'DB17,X0.1',
  MTK3: 'DB17,X0.2',
  Buzzer: 'DB17,X0.3',
  LampRun1: 'DB17,X0.4',
  LampRun2: 'DB17,X0.5',
  LampRun3: 'DB17,X0.6',
  LampError1: 'DB17,X0.7',
  LampError2: 'DB17,X1.0',
  LampError3: 'DB17,X1.1',
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
