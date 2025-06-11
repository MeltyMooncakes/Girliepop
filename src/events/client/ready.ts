import { DiscordClient } from "../..";

export class Event {
	type = "ready";

	constructor() {

	}

	async run(client: DiscordClient) {
		console.log(`[BOT] I AM ALIVE BITCHES`);
		client.automod.setup();
		client.logger.setup();

		for (const command of client.commands.values()) {
			await client.publisher.publish(command);
		}
	}
}