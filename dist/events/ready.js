"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
class Event {
    type = "ready";
    constructor() { }
    async run(client) {
        console.log("bwaa");
    }
}
exports.Event = Event;
