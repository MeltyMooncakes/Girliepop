"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const errors_1 = require("../errors");
class Event {
    type = "messageCreate";
    constructor() { }
    async run(client, message) {
        if (message.author.id === client?.user?.id) {
            return;
        }
        const captcha = client.captchas.find(k => k.captchaMessage.channelId === message.channelId);
        if (captcha) {
            return await captcha.collect(message);
        }
        if (message.author.bot || !client.config.prefix.test(message.content)) {
            return;
        }
        const args = message.content.replace(client.config.prefix, "").split(/\s/g), commandString = args.shift(), command = client.commands.find(c => [c.name, ...c.aliases].includes(commandString));
        if (!command) {
            return;
        }
        if (command.developer && !client.config.developers.includes(message.author.id)) {
            console.log(client.config.developers, message.author.id);
            return await message.reply({
                embeds: [errors_1.NotDeveloper],
                target: message,
            });
        }
        return await command.message(message, args);
    }
}
exports.Event = Event;
