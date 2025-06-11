import { ButtonInteraction, EmbedBuilder, GuildBan, Interaction } from "discord.js";
import { DiscordClient } from "../..";

export class Event {
	type = "guildBanAdd";

	constructor() { }

	async run(client: DiscordClient, ban: GuildBan) {
		const reason = (ban?.reason || "No reason provided").replace(/\[girliepop\]\s/i, "");

		const embed = new EmbedBuilder()
			.setColor("Red")
			.setAuthor({
				name: `@${ban.user.username} (${ban.user.id})`,
				iconURL: ban.user.avatarURL() || undefined,
			})
			.setDescription(`**Reason**: \`${reason}\``)
			.setFooter({ text: "User Banned" })
			.setTimestamp();

		await client.logger.addEntry("moderation", { embeds: [embed.toJSON()] }, ban.guild.id);

		if ((ban?.reason || "").startsWith("[Girliepop]")) {
			return;
		}

		return await client.cases.createEntry({
			reason,
			moderator: "unknown",
			timestamp: Date.now(),
			user: ban.user.id,
			type: "ban",
			server: ban.guild.id,
			manual: true,
		});
	}
}