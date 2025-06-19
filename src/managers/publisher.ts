import { ApplicationCommand, SlashCommandBuilder } from "discord.js";
import { DiscordClient } from "..";
import DiscordCommand from "../structures/command";
import { Manager } from "../structures/manager";

export class Publisher extends Manager {
	id = "publisher";
	enabled = true;
	category: string;

	constructor(client: DiscordClient) {
		super(client);
	}

	async publish(command: DiscordCommand) {
		console.log(`[PUBLISH] Attempting to publish command: ${command.name}.`);
		try {
			await this.client.application?.commands.create(command.slash)
		} catch (e) {
			console.log(`[PUBLISH] Failed to publish command: ${command.name}.`);
			return console.error(e);
		}

		console.log(`[PUBLISH] Published command successfully: ${command.name}.`);
	}
}