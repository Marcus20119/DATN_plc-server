const socket = io('localhost:3031'); // IP tĩnh (hoặc IP động, hoặc localhost)

const myVar = setInterval(() => {
  socket.emit('Client-send-data', 'Request data client');
}, 100);

// Chương trình con đọc dữ liệu lên IO Field
function fn_IOFieldDataShow(tag, IOField, tofix) {
  socket.on(tag, function (data) {
    if (tofix === 0) {
      document.getElementById(IOField).value = data;
    } else {
      document.getElementById(IOField).value = data.toFixed(tofix);
    }
  });
}

fn_IOFieldDataShow('tag_Bool', 'Bool', 0);
fn_IOFieldDataShow('tag_Byte', 'Byte', 0);
fn_IOFieldDataShow('tag_Integer', 'Integer', 0);
fn_IOFieldDataShow('tag_Real', 'Real', 2);
fn_IOFieldDataShow('tag_String', 'String', 0);

// Chương trình con đổi màu Symbol
function fn_SymbolStatus(ObjectID, SymName, Tag) {
  var imgLink_0 = 'images/symbols/' + SymName + '_0.png'; // Trạng thái tag = 0
  var imgLink_1 = 'images/symbols/' + SymName + '_1.png'; // Trạng thái tag = 1
  var imgLink_2 = 'images/symbols/' + SymName + '_2.png'; // Trạng thái tag = 2
  socket.on(Tag, function (data) {
    if (data == 0) {
      document.getElementById(ObjectID).src = imgLink_0;
    } else if (data == 1) {
      document.getElementById(ObjectID).src = imgLink_1;
    } else {
      document.getElementById(ObjectID).src = imgLink_2;
    }
  });
}
fn_SymbolStatus('Pump_1', 'Pump1', 'tag_Byte');
