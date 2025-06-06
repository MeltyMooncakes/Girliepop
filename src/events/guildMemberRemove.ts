import { EmbedBuilder, GuildMember } from "discord.js";
import { AccountNotOldEnough } from "../errors";
import { DiscordClient } from "..";

export class Event {
	type = "guildMemberRemove";

	constructor() { }

	async run(client: DiscordClient, member: GuildMember) {
		client.automod.unverifiedMembers.push(member.id);


		const embed = new EmbedBuilder()
			.setColor("Red")
			.setAuthor({
				name: `@${member.user.username} (${member.id})`,
				iconURL: member.avatarURL() || member.user.avatarURL() || "",
			})
			.setDescription(`<@${member.user.id}> joined this server <t:${(member?.joinedTimestamp || 0) / 1000}:R>`)
			.setTimestamp();

		client.logger.addEntry("members", embed);
	}
}