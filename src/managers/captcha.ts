import { ButtonInteraction, DMChannel, Message, MessageFlags } from "discord.js";
import { DiscordClient } from "..";
import Captcha from "../structures/captcha";
import { CollectionManager } from "../structures/manager";
import { AlreadyVerified, AlreadyVerifying, CouldNotDM } from "../errors";

export class CaptchaManager extends CollectionManager<string, Captcha> {
	id = "captcha";
	enabled = true;
	category: string;

	constructor(client: DiscordClient) {
		super(client);
	}

	async create(interaction: ButtonInteraction) {
		// if user is already in the process of verifying.
		if (this.some(c => c.interaction.member?.user.id === interaction.member?.user.id)) {
			return await interaction.reply({
				embeds: [AlreadyVerifying],
				flags: [MessageFlags.Ephemeral],
			});
		}

		// if user is already verifyied.
		if (interaction.guild?.members.cache.get(interaction.user.id)?.roles.cache.has("1231247596471717908")) {
			console.log(`[VERIFY] [${interaction.user.id}] Captcha has failed for reason: Already verified.`);
			return await interaction.reply({
				embeds: [AlreadyVerified],
				flags: [MessageFlags.Ephemeral],
			});
		}

		const captcha = await new Captcha(this.client, interaction).generate();
		try {
			await captcha.sendMessage(await interaction.user.createDM(true))

			await interaction.reply({
				content: "I have sent you a DM with your verification instructions.",
				flags: [MessageFlags.Ephemeral],
			});
			return this.set(interaction.id, captcha);
		} catch (e) {
			return this.failSend(captcha, interaction);
		}
	}

	async failSend(captcha: Captcha, interaction: ButtonInteraction) {
		console.log(`[VERIFY] [${interaction.user.id}] Captcha has failed for reason: Could not DM.`);
		captcha.end();
		
		try {
			return await interaction.reply({
				embeds: [CouldNotDM],
				flags: [MessageFlags.Ephemeral],
			});
		} catch {
			console.log(`[VERIFY] [${interaction.user.id}] Could not inform user, interaction fuckery.`);
		}
	}
}