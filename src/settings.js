let DEBUG = true;
let HOST_URL = "https://test.herokuapp.com";
let SOCKET_URL = "wss://test.herokuapp.com";
if (DEBUG) {
    HOST_URL = "http://37.156.25.234:8000";
    SOCKET_URL = "ws://37.156.25.234:8000";
}

export { HOST_URL, SOCKET_URL };