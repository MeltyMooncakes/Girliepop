import { ButtonInteraction, Interaction } from "discord.js";
import { DiscordClient } from "..";

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
}