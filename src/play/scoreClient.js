const GameEvent = {
  System: 'system',
  End: 'gameEnd',
  Start: 'gameStart',
};

class EventMessage {
  constructor(from, type, value) {
    this.from = from;
    this.type = type;
    this.value = value;
  }
}

class ScoreClient {
    observers = [];
    events = [];


    constructor() {
      let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);

        this.socket.onopen = (event) => {
            this.receiveEvent(new EventMessage('Sudoku', GameEvent.System, { msg: 'connected' }));
        };

        this.socket.onmessage = async (event) => {
          try {
            const text = JSON.parse(await event.data.text());
            this.receiveEvent(event);
          } catch{}
        };

        this.socket.onclose = (event) => {
            this.receiveEvent(new EventMessage('Sudoku', GameEvent.System, { msg: 'disconnected' }));
        };
    }


  // Update Scores over the websocket
  updateScores(from, type, value) {
    const event = new EventMessage(from, type, value);
    this.socket.send(JSON.stringify(event));
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers.filter((h) => h !== observer);
  }


  receiveEvent(event) {
    this.events.push(event);

    this.events.forEach((e) => {
      this.observers.forEach((observer) => {
        observer(e);
      });
    });
  }

}

const ScoreClientInstance = new ScoreClient();
export { GameEvent, ScoreClientInstance };