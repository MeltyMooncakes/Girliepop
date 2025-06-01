import { AttachmentBuilder, ButtonInteraction, DMChannel, EmbedBuilder, Interaction, MessageFlags } from "discord.js";
import { DiscordClient } from "..";
import { CouldNotDM } from "../errors";

export class Event {
	type = "interactionCreate";

	constructor() { }

	async run(client: DiscordClient, interaction: Interaction) {
		if (interaction.isButton()) {
			this.button(client, interaction);
		}
	}

	async button(client: DiscordClient, interaction: ButtonInteraction) {
		if (interaction.customId === "girls-verify") {
			return await client.captchas.create(interaction);
		}
	}

	async captcha(interaction: ButtonInteraction, dmChannel: DMChannel, captcha: string) {
		await interaction.reply({
			content: "I have sent you a DM with your verification instructions.",
			flags: [MessageFlags.Ephemeral]
		});

		const exp = new RegExp(captcha, "i")

		const collector = dmChannel.createMessageCollector({ time: 30_000, filter: () => true });

		console.log("hgdrhggrdse");

		let attempts = 0;

		collector.on("collect", c => {

			console.log("hgdrhggrdse");
			if (exp.test(c.content)) {
				return this.completeCaptcha(interaction, dmChannel);
			}

			attempts++;
			return c.reply(`Incorrect string of characters, \`${attempts - 5}\` attempts remaining.`)
		})
	}

	async completeCaptcha(interaction: ButtonInteraction, dmChannel: DMChannel) {

	}
}