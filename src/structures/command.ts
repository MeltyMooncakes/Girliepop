import { Message, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder } from "discord.js";
import { DiscordClient } from "../";

export default class DiscordCommand {
	client: DiscordClient;

	name: string;
	description: string;

	textArgs: string;
	aliases: string[];

	developer: boolean;

	slash: SlashCommandBuilder = new SlashCommandBuilder();

	constructor(client: DiscordClient) {
		this.client = client;
	}

	setup() {
		this.slash
			.setName(this.name)
			.setDescription(this?.description || "No description provided.");
	}

	async message(message: Message, args: string[]): Promise<any> { }
}