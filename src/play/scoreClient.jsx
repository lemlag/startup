class ScoreClient {
    observers = [];
    connected = false;


    constructor() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new Websocket(`${protocol}://${window.location.host}/ws`);

        this.socket.onopen = (event) => {
            this.notifyObservers('system', 'websocket', 'connected');
            this.connected = true;
        };

        this.socket.onmessage = async (event) => {
            const text = await event.data.text();
            const data = JSON.parse(text);
            this.notifyObservers('received');
        };

        this.socket.onclose = (event) => {
            this.notifyObservers('system', 'websocket', 'disconnected');
            this.connected = false;
        };
    }
  // Send a message over the webSocket
  sendMessage(name, msg) {
    this.notifyObservers('sent', 'me', msg);
    this.socket.send(JSON.stringify({ name, msg }));
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers(event, from, msg) {
    this.observers.forEach((h) => h({ event, from, msg }));
  }
}