import { ButtonInteraction, EmbedBuilder, GuildMember, Interaction } from "discord.js";
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
		const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id)),
			removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));

		let description = "";

		if (addedRoles.size > 0) {
			description += `**Added Role${addedRoles.size > 1 ? "s" : ""}**: ${addedRoles.map(role => `\`${role.name}\``).join(", ")}\n`;
		}

		if (removedRoles.size > 0) {
			description += `**Added Role${removedRoles.size > 1 ? "s" : ""}**: ${removedRoles.map(role => `\`${role.name}\``).join(", ")}\n`;
		}

		const embed = new EmbedBuilder()
			.setColor("Yellow")
			.setAuthor({
				name: `@${newMember.user.username} (${newMember.id})`,
				iconURL: newMember.avatarURL() || newMember.user.avatarURL() || undefined,
			})
			.setDescription(description)
			.setTimestamp();

		await client.logger.addEntry("roles", embed, newMember.guild.id);
	}
}