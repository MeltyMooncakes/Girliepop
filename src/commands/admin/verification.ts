import { ActionRowBuilder, ButtonBuilder, EmbedBuilder, Message } from "discord.js";
import { DiscordClient } from "../..";
import axios from "axios";
import DiscordCommand from "../../structures/command";

export class Command extends DiscordCommand {
	name = "verify";
	textArgs = "";
	aliases = [];
	description = "Creates a bot verification message.";
	
	developer = false;
	
	constructor(client: DiscordClient) {
		super(client);
	}

	async message(message: Message, args: string[]) {
		if (message.channel.isDMBased() || message.author.id !== "1305215902685597797") {
			return;
		}

		message.channel.send({
			embeds: [
				new EmbedBuilder()
					.setTitle("Verification")
					.setDescription("Click the button below to verify.")
			],
			components: [
				new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId("girls-verify")
							.setLabel("Verify")
					).toJSON()
			]
		});
	}
}