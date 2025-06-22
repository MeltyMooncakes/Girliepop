import { AttachmentBuilder, ButtonInteraction, ChannelType, DMChannel, EmbedBuilder, GuildMember, Interaction, Message } from "discord.js";
import { DiscordClient } from "../..";
import diff from "fast-diff";

export class Event {
	type = "messageUpdate";

	constructor() { 
		console.log("hgedrsgaaaaaer")}

	async run(client: DiscordClient, oldMessage: Message, newMessage: Message) {
		console.log("hgedrsger")
		if (oldMessage.content !== newMessage.content) {
			return await this.edited(client, oldMessage, newMessage);
		}

		// 	await client.logger.addEntry("messages", {
		// 		embeds: [embed.toJSON()],
		// 		files: [new AttachmentBuilder(oldMessage.content, {
		// 			name: "Content.txt",
		// 		})],
		// 	}, newMessage?.guild?.id || "0");
		// }
	}

	async edited(client: DiscordClient, oldMessage: Message, newMessage: Message) {
		if (oldMessage.channel.type === ChannelType.DM) {
			return;
		}

		console.log(oldMessage.content, newMessage.content);
		const content = diff(oldMessage.content, newMessage.content)
			.map(pair => {
				return ["", "**", "~~"].at(pair[0]) + pair[1] + ["", "**", "~~"].at(pair[0]);
			}).join("");

		const embed = new EmbedBuilder()
			.setColor("Yellow")
			.setAuthor({
				name: `@${newMessage.author.username} (${newMessage.author.id})`,
				iconURL: newMessage?.member?.avatarURL() || newMessage.author.avatarURL() || undefined,
			})
			.setDescription(content)
			.setFooter({ text: `Message edited in ${oldMessage.channel.name}` })
			.setTimestamp();

		client.logger.addEntry("messages", { embeds: [embed]}, oldMessage.guild?.id || "");
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

	// }
}