import { Message, SlashCommandOptionsOnlyBuilder } from "discord.js";
import { DiscordClient } from "../";

export default class DiscordCommand {
	client: DiscordClient;

	name: string;
	textArgs: string;
	aliases: string[];

	developer: boolean;

	options: SlashCommandOptionsOnlyBuilder
	
	constructor(client: DiscordClient) {
		this.client = client;
	}
	
	async message(message: Message, args: string[]) {}
}