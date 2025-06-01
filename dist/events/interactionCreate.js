"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const discord_js_1 = require("discord.js");
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
    async captcha(interaction, dmChannel, captcha) {
        await interaction.reply({
            content: "I have sent you a DM with your verification instructions.",
            flags: [discord_js_1.MessageFlags.Ephemeral]
        });
        const exp = new RegExp(captcha, "i");
        const collector = dmChannel.createMessageCollector({ time: 30_000, filter: () => true });
        console.log("hgdrhggrdse");
        let attempts = 0;
        collector.on("collect", c => {
            console.log("hgdrhggrdse");
            if (exp.test(c.content)) {
                return this.completeCaptcha(interaction, dmChannel);
            }
            attempts++;
            return c.reply(`Incorrect string of characters, \`${attempts - 5}\` attempts remaining.`);
        });
    }
    async completeCaptcha(interaction, dmChannel) {
    }
}
exports.Event = Event;
