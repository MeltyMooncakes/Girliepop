import { ButtonInteraction, DMChannel, Message, MessageFlags } from "discord.js";
import { DiscordClient } from "..";
import Captcha from "../structures/captcha";
import { CollectionManager } from "../structures/manager";
import { AlreadyVerified, CouldNotDM } from "../errors";

export class CaptchaManager extends CollectionManager<string, Captcha> {
	id = "captcha";
	enabled = true;
	category: string;

	constructor(client: DiscordClient) {
		super(client);
	}

	async create(interaction: ButtonInteraction) {
		if (interaction.guild?.members.cache.get(interaction.user.id)?.roles.cache.has("1231247596471717908")) {
			console.log(`[VERIFY] [${interaction.user.id}] Captcha has failed for reason: Already verified.`);
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
			.catch(() => {
				console.log(`[VERIFY] [${interaction.user.id}] Captcha has failed for reason: Could not DM.`);
				captcha.end();
				return interaction.reply({
					embeds: [CouldNotDM],
					flags: [MessageFlags.Ephemeral],
				}).catch(() => {
					console.log(`[VERIFY] [${interaction.user.id}] Could not inform user, interaction fuckery.`);
				});
			});
	}
}