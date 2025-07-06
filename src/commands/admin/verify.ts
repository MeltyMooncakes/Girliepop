import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Message } from "discord.js";
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

		
		const channel = await (await this.client.guilds.fetch("1231247596459130974")).channels.fetch("1233485156325658634");
		
		if (!channel) {
			return;
		}

		if (channel.isDMBased() || !channel.isTextBased()) {
			return;
		}

		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId("girls-verify")
					.setLabel("Verify")
					.setStyle(ButtonStyle.Success)
			);


		channel.send({
			embeds: [
				new EmbedBuilder()
					.setTitle("Verification")
					.setDescription("Click the button below to verify.").toJSON()
			],
			//@ts-ignore
			components: [row]
		});
	}
}