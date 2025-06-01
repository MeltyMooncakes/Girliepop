"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandManager = void 0;
const manager_1 = require("../structures/manager");
class CommandManager extends manager_1.Manager {
    id = "publisher";
    enabled = true;
    category;
    constructor(client) {
        super(client);
    }
    async publish() {
    }
}
exports.CommandManager = CommandManager;
