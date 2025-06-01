import { DiscordClient } from "..";
import { Manager } from "../structures/manager";

export class CommandManager extends Manager {
	id = "publisher";
	enabled = true;
	category: string;

	constructor(client: DiscordClient) {
		super(client);
	}

	async publish() {
		
	}
}