"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const discord_js_1 = require("discord.js");
const axios_1 = __importDefault(require("axios"));
class Command {
    client;
    name = "dog";
    textArgs = "";
    aliases = [];
    developer = false;
    constructor(client) {
        this.client = client;
    }
    async message(message, args) {
        return await message.reply({
            embeds: [
                new discord_js_1.EmbedBuilder()
                    .setColor(this.client.config.embedColour)
                    .setTitle("Here's a random dog!!!")
                    .setImage((await axios_1.default.get("https://random.dog/woof.json")).data.url)
            ],
            target: message,
        });
    }
}
exports.Command = Command;
