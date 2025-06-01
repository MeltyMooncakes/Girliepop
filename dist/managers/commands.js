"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandManager = void 0;
const fs_1 = require("fs");
const glob_1 = require("glob");
const path_1 = require("path");
const manager_1 = require("../structures/manager");
class CommandManager extends manager_1.CollectionManager {
    id = "commands";
    enabled = true;
    category;
    constructor(client) {
        super(client);
        this.init();
    }
    async init() {
        for await (const category of (0, fs_1.readdirSync)("./src/commands")) {
            const commandFiles = await (0, glob_1.glob)(`${(0, path_1.resolve)(__dirname, "../")}/commands/${category}/*`, {});
            for await (const commandPath of commandFiles) {
                const { Command } = await Promise.resolve(`${commandPath}`).then(s => __importStar(require(s))), command = new Command(this.client);
                command.category = category;
                command.path = commandPath;
                this.set(command.name, command);
            }
        }
        this.client.emit("managerCommandsLoaded");
    }
}
exports.CommandManager = CommandManager;
