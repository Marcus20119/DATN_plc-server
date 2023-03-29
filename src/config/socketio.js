import { Server } from 'socket.io';
import { onValue, ref, set } from 'firebase/database';

import lodash from 'lodash';

import { realTimeDb } from './firebase-config';

export const initSocket = (server, conn_plc) => {
  const io = new Server(server);
  let write_value = [false, 0, 0, 0, 'lala'];

  function writeUserData(tagBool, tagByte, tagInteger, tagReal, tagString) {
    set(ref(realTimeDb, 'XLNT_PLC'), {
      tagBool,
      tagByte,
      tagInteger,
      tagReal,
      tagString,
    });
  }

  // ĐỌC DỮ LIỆU TỪ PLC VÀ ĐƯA VÀO MẢNG - MỖI GIÂY 1 LẦN
  setInterval(() => {
    conn_plc.readAllItems((error, values) => {
      if (error) {
        console.log('Error occurred when reading data: ');
      }
      // Chuyển variable sang array
      let arr_tag_value = [false, 0, 0, 0, ''];
      arr_tag_value = lodash.map(values, item => {
        return item;
      });
      writeUserData(
        arr_tag_value[0],
        arr_tag_value[1],
        arr_tag_value[2],
        arr_tag_value[3],
        arr_tag_value[4]
      );
    });
  }, 1000);
  // HÀM CALLBACK GHI DỮ LIỆU XUỐNG PLC
  function valuesWritten(anythingBad, values) {
    if (anythingBad) {
      console.log('SOMETHING WENT WRONG WRITING VALUES!!!!');
    }
    console.log('Done writing.');
  }

  const starCountRef = ref(realTimeDb, 'XLNT_WEB');
  onValue(starCountRef, snapshot => {
    const data = snapshot.val();
    write_value = Object.values(data);
  });

  // setInterval(() => {
  //   writeUserData(
  //     arr_tag_value[0],
  //     arr_tag_value[1],
  //     arr_tag_value[2],
  //     arr_tag_value[3],
  //     arr_tag_value[4]
  //   );
  // }, 1000);
  setInterval(() => {
    // console.log(write_value);
    // conn_plc.writeItems('tag_Bool', write_value[0], valuesWritten);
  }, 500);

  // io.on('connection', function (socket) {
  //   socket.on('Client-send-cmdM1', function (data) {
  //     conn_plc.writeItems('tag_Bool', data, valuesWritten);
  //   });

  //   socket.on('Client-send-data', function (data) {
  //     io.sockets.emit('tag_Bool', arr_tag_value[0]);
  //     io.sockets.emit('tag_Byte', arr_tag_value[1]);
  //     io.sockets.emit('tag_Integer', arr_tag_value[2]);
  //     io.sockets.emit('tag_Real', arr_tag_value[3]);
  //     io.sockets.emit('tag_String', arr_tag_value[4]);
  //   });
  // });
};
