/**
 * Docker Weblog client constructor
 *
 * @param {Object}        [opts]      Options
 * @param {string}        [opts.host] The weblog host (ie. "localhost")
 * @param {number|string} [opts.port] The weblog port (ie. 3456)
 *
 * @constructor
 */
var DockerWeblogClient = function (opts) {
  opts = opts || {};

  var socket;

  function createSocketUrl () {
    var scheme = 'ws';
    var host = opts.host || 'localhost';
    var port = opts.port || 3456;

    return scheme + '://' + host + ':' + parseInt(port, 10) + '/socket.io/?EIO=3&transport=websocket';
  }

  function handleMessage (message) {
    if (message && message.data && message.data.indexOf('42') === 0) {
      try {
        var data = JSON.parse(message.data.substr(2));
        var body = data[1];

        console.groupCollapsed(body._tag);
        console.log(body);
        console.groupEnd();
      } catch (e) {
        console.warn('Docker Weblog failed to parse data from log entry: ' + e);
      }
    }
  }

  function register () {
    if (!!socket) {
      return;
    }

    socket = new WebSocket(createSocketUrl());
    socket.onmessage = handleMessage;
  }

  function unregister () {
    if (!socket) {
      return;
    }

    socket.close();
    socket = null;
  }

  return {
    register: register,
    unregister: unregister
  };
};
