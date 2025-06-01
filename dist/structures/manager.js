"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionManager = exports.Manager = void 0;
const discord_js_1 = require("discord.js");
class Manager {
    id;
    enabled;
    client;
    constructor(client) {
        this.client = client;
    }
}
exports.Manager = Manager;
class CollectionManager extends discord_js_1.Collection {
    id;
    enabled;
    client;
    constructor(client) {
        super();
        this.client = client;
    }
}
exports.CollectionManager = CollectionManager;
