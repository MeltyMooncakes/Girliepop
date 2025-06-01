"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
class Event {
    type = "managerCommandsLoaded";
    constructor() { }
    async run(client) {
        console.log(`${client.commands.size} Commands loaded.`);
    }
}
exports.Event = Event;
