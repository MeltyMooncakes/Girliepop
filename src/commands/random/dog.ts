import { EmbedBuilder, Message } from "discord.js";
import { DiscordClient } from "../..";
import axios from "axios";
import DiscordCommand from "../../structures/command";

export class Command extends DiscordCommand {
	name = "dog";
	textArgs = "";
	aliases = [];
	description = "Sends a random picture of a dog.";
	
	developer = false;
	
	constructor(client: DiscordClient) {
		super(client);
	}

	async message(message: Message, _args: string[]) {
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