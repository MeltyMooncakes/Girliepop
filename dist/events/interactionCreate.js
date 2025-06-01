"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
class Event {
    type = "interactionCreate";
    constructor() { }
    async run(client, interaction) {
        if (interaction.isButton()) {
            this.button(client, interaction);
        }
    }
    async button(client, interaction) {
        if (interaction.customId === "girls-verify") {
            return await client.captchas.create(interaction);
        }
    }
}
exports.Event = Event;
