import { EmbedBuilder, Message } from "discord.js";
import { DiscordClient } from "../..";
import axios from "axios";

export class Command {
	client: DiscordClient;

	name = "dog";
	textArgs = "";
	aliases = [];
	
	developer = false;
	
	constructor(client: DiscordClient) {
		this.client = client;
	}

	async message(message: Message, args: string[]) {
		return await message.reply({
			embeds: [
				new EmbedBuilder()
					.setColor(this.client.config.embedColour)
					.setTitle("Here's a random dog!!!")
					.setImage((await axios.get("https://random.dog/woof.json")).data.url)
			],
			target: message,
		});
	}
}