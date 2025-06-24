import { Guild, Message } from "discord.js";
import { DiscordClient } from "..";
import { Manager } from "../structures/manager";
import { AccountUnverifiedTooLong } from "../errors";

export class Automod extends Manager {
	id = "automod";
	enabled = true;
	category: string;

	unverifiedMembers: string[] = [];
	server: Guild;

	constructor(client: DiscordClient) {
		super(client);
	}

	async setup() {
		this.server = await this.client.guilds.fetch("1231247596459130974");

		const verificationChannel = await this.server.channels.fetch("1233485156325658634");

		// @ts-ignore
		for (const member of verificationChannel?.members.values()) {
			if (!member) {
				return;
			}

			if (!member.roles.cache.has("1231247596471717908") && !member.roles.cache.has("1231247596459130983")) {
				this.unverifiedMembers.push(member.id);
			}
		}

		setInterval(async () => {
			for (const memberId of this.unverifiedMembers) {
				// get member in a way that doesnt bitch about it
				let member;
				try {
					member = await this.server.members.fetch(memberId);
				} catch (e) {
					return this.removeUnverified(memberId);
				}

				if (member.roles.cache.has("1231247596471717908") || member.roles.cache.has("1231247596459130983")) {
					return this.removeUnverified(member.id);
				}

				if ((Date.now() - (member?.joinedTimestamp || 0)) > 2592e6) {
					// attempt to DM the user informing them.
					try {
						const dmChannel = await member.createDM();
						await dmChannel.send({
							embeds: [AccountUnverifiedTooLong]
						});
					} catch (e) {
						console.log(`[MOD] [${member.id}] Could not inform user, could not DM.`);
					}

					await member.kick("User was unverified for longer than 30 days.");
					console.log(`[MOD] [${member.id}] Kicked user, account unverified longer than 30 days.`);
				}
			}
		}, 3e4);
	}

	removeUnverified(id: string) {
		const index = this.unverifiedMembers.indexOf(id);
		if (index !== -1) {
			this.unverifiedMembers.splice(index, 1);
		}
	}

	async checkMessage(message: Message) {
		if ()
	}
}