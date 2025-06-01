import { ButtonInteraction, DMChannel, Message, MessageFlags } from "discord.js";
import { DiscordClient } from "..";
import Captcha from "../structures/captcha";
import { CollectionManager } from "../structures/manager";
import { AlreadyVerified } from "../errors";

export class CaptchaManager extends CollectionManager<string, Captcha> {
	id = "captcha";
	enabled = true;
	category: string;

	constructor(client: DiscordClient) {
		super(client);
	}

	async create(interaction: ButtonInteraction) {
		// @ts-ignore
		if (interaction.member?.roles.cache.has("1231247596471717908")) {
			return await interaction.reply({
					embeds: [AlreadyVerified],
					flags: [MessageFlags.Ephemeral],
				});
		}
		const captcha = await new Captcha(this.client, interaction).generate();
		return captcha.sendMessage(await interaction.user.createDM(true))
			.then(async () => {
				await interaction.reply({
					content: "I have sent you a DM with your verification instructions.",
					flags: [MessageFlags.Ephemeral],
				});
				this.set(interaction.id, captcha);
			})
			.catch(e => { throw e });
	}
}