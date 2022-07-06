let DEBUG = true;
let HOST_URL = "https://test.herokuapp.com";
let SOCKET_URL = "wss://test.herokuapp.com";
if (DEBUG) {
    HOST_URL = "http://84.241.60.84:8000";
    SOCKET_URL = "ws://84.241.60.84:8000";
}

export { HOST_URL, SOCKET_URL };