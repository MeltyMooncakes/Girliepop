"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaptchaManager = void 0;
const discord_js_1 = require("discord.js");
const captcha_1 = __importDefault(require("../structures/captcha"));
const manager_1 = require("../structures/manager");
const errors_1 = require("../errors");
class CaptchaManager extends manager_1.CollectionManager {
    id = "captcha";
    enabled = true;
    category;
    constructor(client) {
        super(client);
    }
    async create(interaction) {
        // @ts-ignore
        if (interaction.member?.roles.cache.has("1231247596471717908")) {
            return await interaction.reply({
                embeds: [errors_1.AlreadyVerified],
                flags: [discord_js_1.MessageFlags.Ephemeral],
            });
        }
        const captcha = await new captcha_1.default(this.client, interaction).generate();
        return captcha.sendMessage(await interaction.user.createDM(true))
            .then(async () => {
            await interaction.reply({
                content: "I have sent you a DM with your verification instructions.",
                flags: [discord_js_1.MessageFlags.Ephemeral],
            });
            this.set(interaction.id, captcha);
        })
            .catch(e => { throw e; });
    }
}
exports.CaptchaManager = CaptchaManager;
