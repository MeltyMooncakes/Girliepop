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
        if (interaction.guild?.members.cache.get(interaction.user.id)?.roles.cache.has("1231247596471717908")) {
            console.log(`[VERIFY] [${interaction.user.id}] Captcha has failed for reason: Already verified.`);
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
            .catch(() => {
            console.log(`[VERIFY] [${interaction.user.id}] Captcha has failed for reason: Could not DM.`);
            captcha.end();
            return interaction.reply({
                embeds: [errors_1.CouldNotDM],
                flags: [discord_js_1.MessageFlags.Ephemeral],
            }).catch(() => {
                console.log(`[VERIFY] [${interaction.user.id}] Could not inform user, interaction fuckery.`);
            });
        });
    }
}
exports.CaptchaManager = CaptchaManager;
