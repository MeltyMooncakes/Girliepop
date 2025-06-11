import { EmbedBuilder, Message } from "discord.js";
import { DiscordClient } from "../..";
import axios from "axios";
import DiscordCommand from "../../structures/command";

export class Command extends DiscordCommand {
	name = "cat";
	textArgs = "";
	aliases = [];
	description = "Sends a random picture of a cat.";
	
	developer = false;
	
	constructor(client: DiscordClient) {
		super(client);
	}

	async message(message: Message, args: string[]) {
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