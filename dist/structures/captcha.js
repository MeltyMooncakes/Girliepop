"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const discord_js_1 = require("discord.js");
class Captcha {
    client;
    value;
    buffer;
    interaction;
    captchaMessage;
    attempts = 0;
    exp;
    constructor(client, interaction) {
        this.client = client;
        this.interaction = interaction;
    }
    async generate() {
        const captcha = (0, child_process_1.execSync)(`./tools/captcha`).toString().split("\n");
        this.buffer = Buffer.from(captcha[1].split(",")[1], "base64");
        this.value = captcha[0];
        this.exp = new RegExp(this.value, "i");
        return this;
    }
    async sendMessage(dmChannel) {
        this.captchaMessage = await dmChannel.send({
            embeds: [
                new discord_js_1.EmbedBuilder()
                    .setTitle("Captcha")
                    .setImage("attachment://captcha.png")
                    .setDescription("Type out the following characters to verify!")
            ],
            files: [new discord_js_1.AttachmentBuilder(this.buffer, { name: "captcha.png" })]
        });
    }
    async collect(m) {
        console.log("hgdrhggrdse");
        if (this.exp.test(m.content)) {
            return this.complete(m);
        }
        this.attempts++;
        return m.reply(`Incorrect string of characters, \`${5 - this.attempts}\` attempts remaining.`);
    }
    async complete(m) {
        (await this.client.guilds
            .cache.get("1231247596459130974")
            ?.members.fetch(this.interaction.user.id))?.roles.add("1231247596471717908");
        await m.reply({
            content: "Verification completed, Welcome to the server!",
        });
        this.client.captchas.delete(this.interaction.id);
    }
}
exports.default = Captcha;
