import { EmbedBuilder, Message } from "discord.js";
import { DiscordClient } from "../..";
import axios from "axios";

export class Command {
	client: DiscordClient;

	name = "goose";
	textArgs = "";
	aliases = [];
	
	developer = false;
	
	constructor(client: DiscordClient) {
		this.client = client;
	}

	async message(message: Message, _args: string[]) {
		return await message.reply({
			embeds: [
				new EmbedBuilder()
					.setColor(this.client.config.embedColour)
					.setTitle("Here's a random goose!!!")
					.setImage((await axios.get("https://nekos.life/api/v2/img/goose")).data.url)
			],
			target: message,
		});
	}
}