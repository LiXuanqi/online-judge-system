module.exports = function(io) {
  // store sessions
  let collaborations = [];

  let socketIdToSessionId = [];

  io.on('connection', (socket) => {
    let sessionId = socket.handshake.query['sessionId'];
    socketIdToSessionId[socket.id] = sessionId;

    if (!(sessionId in collaborations)) {
      collaborations[sessionId] = {
        'participants': []
      };
    }
    // add a new person to a session.
    collaborations[sessionId]['participants'].push(socket.id);

    socket.on('change', delta => {
      console.log("change from client: " + socketIdToSessionId[socket.id] + " " + delta);
      let sessionId = socketIdToSessionId[socket.id]; // ?
      if (sessionId in collaborations) {
        let participants = collaborations[sessionId]['participants'];
        for (let i = 0; i < participants.length; i++) {
          if (socket.id != participants[i]) {
            io.to(participants[i]).emit("change", delta);
          }
        }
      }
    })
  })
}