import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "discord.js";
import { DiscordClient } from "..";
export class Event {
	type = "ready";

	constructor() { }

	async run(client: DiscordClient) {
		console.log(`[BOT] I AM ALIVE BITCHES`);
	}
}