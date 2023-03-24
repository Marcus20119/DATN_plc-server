export const connectPLC = conn_plc => {
  // Tạo địa chỉ kết nối (slot = 2 nếu là 300/400, slot = 1 nếu là 1200/1500)
  conn_plc.initiateConnection(
    { port: 102, host: '192.168.2.13', rack: 0, slot: 1 },
    PLC_connected
  );

  const tags_list = {
    tag_Bool: 'DB1,X0.0',
    tag_Byte: 'DB1,BYTE1',
    tag_Integer: 'DB1,INT2',
    tag_Real: 'DB1,REAL4',
    tag_String: 'DB1,S8.256',
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
      'tag_Bool',
      'tag_Byte',
      'tag_Integer',
      'tag_Real',
      'tag_String',
    ]);
  }
};
