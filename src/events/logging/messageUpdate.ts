import { AttachmentBuilder, ButtonInteraction, EmbedBuilder, GuildMember, Interaction, Message } from "discord.js";
import { DiscordClient } from "../..";

export class Event {
	type = "messageUpdate";

	constructor() { }

	async run(client: DiscordClient, oldMessage: Message, newMessage: Message) {
		// if (oldMessage.content !== newMessage.content) {

		// 	const embed = new EmbedBuilder()
		// 		.setColor("Red")
		// 		.setAuthor({
		// 			name: `@${newMessage.author.username} (${newMessage.author.id})`,
		// 			iconURL: newMessage?.member?.avatarURL() || newMessage.author.avatarURL() || undefined,
		// 		})
		// 		.setTimestamp();

		// 	await client.logger.addEntry("messages", {
		// 		embeds: [embed.toJSON()],
		// 		files: [new AttachmentBuilder(oldMessage.content, {
		// 			name: "Content.txt",
		// 		})],
		// 	}, newMessage?.guild?.id || "0");
		// }
	}

	// async roleUpdate(client: DiscordClient, oldMember: GuildMember, newMember: GuildMember) {
	// 	const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id)),
	// 		removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));

	// 	let description = "";

	// 	if (addedRoles.size > 0) {
	// 		description += `**Added Role${addedRoles.size > 1 ? "s" : ""}**: ${addedRoles.map(role => `\`${role.name}\``).join(", ")}\n`;
	// 	}

	// 	if (removedRoles.size > 0) {
	// 		description += `**Added Role${removedRoles.size > 1 ? "s" : ""}**: ${removedRoles.map(role => `\`${role.name}\``).join(", ")}\n`;
	// 	}

	// 	const embed = new EmbedBuilder()
	// 		.setColor("Yellow")
	// 		.setAuthor({
	// 			name: `@${newMember.user.username} (${newMember.id})`,
	// 			iconURL: newMember.avatarURL() || newMember.user.avatarURL() || "",
	// 		})
	// 		.setDescription(description)
	// 		.setTimestamp();

	// 	client.logger.addEntry("roles", embed);
	// }
}