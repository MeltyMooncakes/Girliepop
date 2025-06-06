import { EmbedBuilder, GuildMember } from "discord.js";
import { AccountNotOldEnough } from "../../errors";
import { DiscordClient } from "../..";

export class Event {
	type = "guildMemberAdd";

	constructor() { }

	async run(client: DiscordClient, member: GuildMember) {
		client.automod.unverifiedMembers.push(member.id);


		const embed = new EmbedBuilder()
			.setColor("Green")
			.setAuthor({
				name: `@${member.user.username} (${member.id})`,
				iconURL: member.avatarURL() || member.user.avatarURL() || undefined,
			})
			.setDescription(`<@${member.user.id}> joined Discord <t:${Math.trunc(member.user.createdTimestamp / 1000)}:R>`)
			.setTimestamp();

		await client.logger.addEntry("members", embed, member.guild.id);

		// if account is younger than 30 days.
		if ((Date.now() - (member?.user.createdTimestamp || 2592e6)) < 2592e6 && member.id !== "1372852461521342476") {
			console.log(`[MOD] [${member.id}] Account created less than 30 days ago, user has been kicked.`);

			// attempt to DM the user informing them.
			try {
				const dmChannel = await member.createDM();
				await dmChannel.send({
					embeds: [AccountNotOldEnough]
				});
			} catch (e) {
				console.log(`[MOD] [${member.id}] Could not inform user, could not DM.`);
			}

			return await member.kick("Account created less than 30 days ago.");
		}
	}
}