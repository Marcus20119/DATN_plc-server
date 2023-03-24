import { Server } from 'socket.io';
import lodash from 'lodash';

export const initSocket = (server, conn_plc) => {
  const io = new Server(server);
  let arr_tag_value = [];

  // ĐỌC DỮ LIỆU TỪ PLC VÀ ĐƯA VÀO MẢNG - MỖI GIÂY 1 LẦN
  setInterval(() => {
    conn_plc.readAllItems((error, values) => {
      if (error) {
        console.log('Error occurred when reading data: ');
      }
      // Chuyển variable sang array
      arr_tag_value = lodash.map(values, item => {
        return item;
      });
      console.log('values:', values);
    });
  }, 1000);

  // HÀM CALLBACK GHI DỮ LIỆU XUỐNG PLC
  function valuesWritten(anythingBad) {
    if (anythingBad) {
      console.log('SOMETHING WENT WRONG WRITING VALUES!!!!');
    }
    console.log('Done writing.');
  }

  io.on('connection', function (socket) {
    socket.on('Client-send-cmdM1', function (data) {
      conn_plc.writeItems('tag_Bool', data, valuesWritten);
    });

    socket.on('Client-send-data', function (data) {
      io.sockets.emit('tag_Bool', arr_tag_value[0]);
      io.sockets.emit('tag_Byte', arr_tag_value[1]);
      io.sockets.emit('tag_Integer', arr_tag_value[2]);
      io.sockets.emit('tag_Real', arr_tag_value[3]);
      io.sockets.emit('tag_String', arr_tag_value[4]);
    });
  });
};
