import { parse } from "yaml";
import { DiscordClient } from "..";
import { Manager } from "../structures/manager";
import { readFileSync } from "fs";
import { ChannelType, EmbedBuilder, Guild } from "discord.js";
import { randomUUID } from "crypto";
import { ObjectId } from "mongodb";

export class LoggingManager extends Manager {
	id = "logger";
	enabled = true;
	category: string;
	interval: NodeJS.Timeout;
	logChannels: LoggingChannels;

	server: Guild;

	constructor(client: DiscordClient) {
		super(client);

		// this could easily be scaled to work with multiple servers if you know what ur doing
		this.logChannels = parse(readFileSync("./configs/logs.yaml", "utf-8"));
	}

	async setup() {
		this.interval = setInterval(async () => {
			const queue = await this.client.db.collection("logging").find({}).toArray();
			if (queue.length === 0) {
				return;
			}

			const entry = queue[0];

			await this.client.db.collection("logging").deleteOne({ _id: entry._id });
			let server;
			try {
				server = await this.client.guilds.fetch(entry.serverId);
			} catch (e) {
				return console.log(`[LOGS] ${entry["serverId"]} Failed to fetch server.`);
			}

			let dbEntry;
			try {
				const dbEntries = await this.client.db.collection("servers").find({ id: entry.serverId }).toArray();
				dbEntry = dbEntries[0];
			} catch (e) {
				return console.log(`[LOGS] ${entry["serverId"]} Could not find server in database.`);
			}


			let channel;
			try {
				channel = await server.channels.fetch(dbEntry["channels"][entry.type]);
			} catch (e) {
				return console.log(`[LOGS] ${dbEntry["channels"][entry.type]} Failed to fetch channel.`);
			}

			if (channel?.type !== ChannelType.GuildText) {
				return console.log(`[LOGS] ${dbEntry["channels"][entry.type]} Fetched channel was not a text channel.`);
			}

			try {
				await channel.send({
					embeds: [entry.embed],
				});
			} catch (e) {
				console.log(e);
				console.log(`[LOGS] ${dbEntry["channels"][entry.type]} Failed to send logging message.`);
			}
		}, 1e3);
	}

	async addEntry(type: LogEntryType, embed: EmbedBuilder, serverId: string) {
		const _id = new ObjectId();
		try {
			await this.client.db.collection("logging").insertOne({ type, serverId, _id,
				embed: embed.toJSON()
			 })
		} catch (e) {
			console.log(`[LOGS] ${_id.id} Failed to insert object into database.`);
		}

		return _id.id;
	}

	async removeEntry(id: string) {
		await this.client.db.collection("logging").deleteOne({ _id: new ObjectId(id) });
	}
}