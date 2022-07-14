let DEBUG = true;
let HOST_URL = "https://test.herokuapp.com";
let SOCKET_URL = "wss://test.herokuapp.com";
if (DEBUG) {
    HOST_URL = "http://localhost:8000";
    SOCKET_URL = "ws://localhost:8000";
}

export { HOST_URL, SOCKET_URL };