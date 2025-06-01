"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    client;
    name;
    textArgs;
    aliases;
    developer;
    options;
    constructor(client) {
        this.client = client;
    }
    async message(message, args) { }
}
exports.default = Command;
