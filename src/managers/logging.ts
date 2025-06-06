import { parse } from "yaml";
import { DiscordClient } from "..";
import { Manager } from "../structures/manager";
import { readFileSync } from "fs";
import { ChannelType, EmbedBuilder, Guild } from "discord.js";
import { randomUUID } from "crypto";

export class LoggingManager extends Manager {
	id = "logger";
	enabled = true;
	category: string;
	interval: NodeJS.Timeout;
	logChannels: LoggingChannels;

	queue: LogEntry[] = [];
	server: Guild;

	constructor(client: DiscordClient) {
		super(client);

		// this could easily be scaled to work with multiple servers if you know what ur doing
		this.logChannels = parse(readFileSync("./configs/logs.yaml", "utf-8"));
	}

	async setup() {
		this.server = await this.client.guilds.fetch("1231247596459130974");

		this.interval = setInterval(async () => {
			if (this.queue.length === 0) {
				return;
			}

			const entry = this.queue[0];

			let channel;
			try {
				channel = await this.server.channels.fetch(this.logChannels[entry.type]);
			} catch (e) {
				return console.log(`[LOGS] ${this.logChannels[entry.type]} Failed to fetch channel.`);
			}

			if (channel?.type !== ChannelType.GuildText) {
				return console.log(`[LOGS] ${this.logChannels[entry.type]} Fetched channel was not a text channel.`);
			}

			try {
				await channel.send({
					embeds: [entry.embed],
				});
			} catch (e) {
				console.log(`[LOGS] ${this.logChannels[entry.type]} Failed to send logging message.`);
			}

			this.removeEntry(entry.id);
		}, 1e3);
	}

	addEntry(type: LogEntryType, embed: EmbedBuilder) {
		const id = randomUUID();

		this.queue.push({ embed, type, id });
		console.log(id);
		return id;
	}

	removeEntry(id: string) {
		this.queue = this.queue.filter(entry => entry.id !== id);
	}
}