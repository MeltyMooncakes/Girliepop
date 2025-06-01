import { GuildMember } from "discord.js";
import { AccountNotOldEnough } from "../errors";
import { DiscordClient } from "..";

export class Event {
	type = "guildMemberAdd";
	
	constructor() {}

	// TODO move to verification process

	async run(client: DiscordClient, member: GuildMember) {
		// if account is younger than 30 days.
		if ((Date.now() - (member?.joinedTimestamp || 2592e6)) < 2592e6) {
			// attempt to DM the user informing them.
			try {
				const dmChannel = await member.createDM();
				await dmChannel.send({
					embeds: [AccountNotOldEnough]
				});
			} catch (e) {
				console.log(`${member.id} could not be DM'ed.`);
			}
			
			return await member.kick("Account created less than 30 days ago.");
		}
	}
}