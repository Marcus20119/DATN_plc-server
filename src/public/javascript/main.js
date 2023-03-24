const socket = io('localhost:3030'); // IP tĩnh (hoặc IP động, hoặc localhost)

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
