import { ButtonInteraction, GuildMember, Interaction } from "discord.js";
import { DiscordClient } from "..";

export class Event {
	type = "guildMemberUpdate";

	constructor() { }

	async run(client: DiscordClient, oldMember: GuildMember, newMember: GuildMember) {

		if (oldMember.roles.cache.difference(newMember.roles.cache).size > 0) {
			await this.roleUpdate(client, oldMember, newMember);
		}
	}

	async roleUpdate(client: DiscordClient, oldMember: GuildMember, newMember: GuildMember) {
		
	}
}