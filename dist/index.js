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
exports.DiscordClient = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const yaml_1 = require("yaml");
const glob_1 = require("glob");
const path_1 = require("path");
const commands_1 = require("./managers/commands");
const process_1 = require("process");
const captcha_1 = require("./managers/captcha");
class DiscordClient extends discord_js_1.Client {
    secrets;
    config;
    commands;
    captchas;
    constructor(options) {
        super(options);
        if (!(0, fs_1.existsSync)("./configs/secrets.yaml")) {
            console.log("./configs/secrets.yaml was not found, creating base file.\nPlease set up this file before starting the bot.");
            (0, fs_1.writeFileSync)("./configs/secrets.yaml", "botToken: INSERT-TOKEN-HERE", "utf-8");
            (0, process_1.exit)(1);
        }
        this.secrets = (0, yaml_1.parse)((0, fs_1.readFileSync)("./configs/secrets.yaml", "utf-8"));
        this.config = (0, yaml_1.parse)((0, fs_1.readFileSync)("./configs/config.yaml", "utf-8"));
        this.config.prefix = new RegExp(this.config.prefix, "i");
        this.commands = new commands_1.CommandManager(this);
        this.captchas = new captcha_1.CaptchaManager(this);
    }
    async start() {
        for await (const eventFile of await (0, glob_1.glob)(`${(0, path_1.resolve)(__dirname, "./")}/events/*`, {})) {
            const { Event } = await Promise.resolve(`${eventFile}`).then(s => __importStar(require(s))), event = new Event(this);
            this.on(event.type, (...args) => event.run(this, ...args));
        }
        this.login(this.secrets.botToken);
    }
}
exports.DiscordClient = DiscordClient;
const client = new DiscordClient({
    intents: [
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildPresences,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.DirectMessages
    ],
    partials: [discord_js_1.Partials.Message, discord_js_1.Partials.GuildMember]
});
client.start();
