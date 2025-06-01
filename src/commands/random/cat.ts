import { EmbedBuilder, Message } from "discord.js";
import { DiscordClient } from "../..";
import axios from "axios";

export class Command {
	client: DiscordClient;

	name = "cat";
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
					.setTitle("Here's a random cat!!!")
					.setImage((await axios.get("https://api.thecatapi.com/v1/images/search")).data[0].url)
			],
			target: message,
		});
	}
}