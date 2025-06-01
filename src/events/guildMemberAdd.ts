import { GuildMember } from "discord.js";
import { AccountNotOldEnough } from "../errors";
import { DiscordClient } from "..";

export class Event {
	type = "guildMemberAdd";

	constructor() { }

	async run(client: DiscordClient, member: GuildMember) {

		if (member.id === "1372852461521342476") {
		}
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