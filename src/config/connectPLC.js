export const connectPLC = conn_plc => {
  // Tạo địa chỉ kết nối (slot = 2 nếu là 300/400, slot = 1 nếu là 1200/1500)
  conn_plc.initiateConnection(
    { port: 102, host: '192.168.0.1', rack: 0, slot: 1 },
    PLC_connected
  );

  const tags_list = {
    tagBool: 'DB1,X0.0',
    tagByte: 'DB1,BYTE1',
    tagInteger: 'DB1,INT2',
    tagReal: 'DB1,REAL4',
    tagString: 'DB1,S8.30',
  };

  // GỬI DỮ LIỆu TAG CHO PLC
  function PLC_connected(err) {
    if (typeof err !== 'undefined') {
      console.log(err); // Hiển thị lỗi nếu không kết nối được với PLC
    }
    conn_plc.setTranslationCB(function (tag) {
      return tags_list[tag];
    }); // Đưa giá trị đọc lên từ PLC và mảng

    conn_plc.addItems([
      'tagBool',
      'tagByte',
      'tagInteger',
      'tagReal',
      'tagString',
    ]);
  }
};
