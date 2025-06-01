import { DiscordClient } from "..";

export class Event {
	type = "managerCommandsLoaded";
	
	constructor() {}

	async run(client: DiscordClient) {
		console.log(`${client.commands.size} Commands loaded.`);
	}
}