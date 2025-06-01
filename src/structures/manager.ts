import { Collection } from "discord.js";
import { DiscordClient } from "../";

export class Manager {
	id: string;
	enabled: boolean;
	client: DiscordClient;
	constructor(client: DiscordClient) {
		this.client = client;
	}
}

export class CollectionManager<K, V> extends Collection<K, V> {
	id: string;
	enabled: boolean;
	client: DiscordClient;
	constructor(client: DiscordClient) {
		super();
		
		this.client = client;
	}
}