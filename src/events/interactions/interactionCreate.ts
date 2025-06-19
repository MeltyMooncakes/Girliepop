import { ButtonInteraction, CommandInteraction, Interaction } from "discord.js";
import { DiscordClient } from "../..";

export class Event {
	type = "interactionCreate";

	constructor() { }

	async run(client: DiscordClient, interaction: Interaction) {
		if (interaction.isButton()) {
			return this.button(client, interaction);
		}
		if (interaction.isCommand()) {
			return this.command(client, interaction);
		}
	}

	async button(client: DiscordClient, interaction: ButtonInteraction) {
		if (interaction.customId === "girls-verify") {
			return await client.captchas.create(interaction);
		}
	}

	async command(client: DiscordClient, interaction: CommandInteraction) {
		const command = client.commands.get(interaction.commandName);

		if (!command) {
			return;
		}
	}
}