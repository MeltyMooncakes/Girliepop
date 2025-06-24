import { AttachmentBuilder, ButtonInteraction, ChannelType, DMChannel, EmbedBuilder, GuildMember, Interaction, Message } from "discord.js";
import { DiscordClient } from "../..";
import diff from "fast-diff";

export class Event {
	type = "messageUpdate";

	constructor() { }

	async run(client: DiscordClient, oldMessage: Message, newMessage: Message) {
		if (oldMessage.content !== newMessage.content) {
			return await this.edited(client, oldMessage, newMessage);
		}
	}

	async edited(client: DiscordClient, oldMessage: Message, newMessage: Message) {
		if (oldMessage.channel.type === ChannelType.DM) {
			return;
		}

		let content = `### New:\n${newMessage.content}`;
		if (oldMessage.content !== null) {
			content = diff(oldMessage.content, newMessage.content)
			.map(pair => {
				return ["", "**", "~~"].at(pair[0]) + pair[1] + ["", "**", "~~"].at(pair[0]);
			}).join("");
		}

		const embed = new EmbedBuilder()
			.setColor("Yellow")
			.setAuthor({
				name: `@${newMessage.author.username} (${newMessage.author.id})`,
				iconURL: newMessage?.member?.avatarURL() || newMessage.author.avatarURL() || undefined,
			})
			.setDescription(content.slice(0,2048))
			.setFooter({ text: `Message edited in ${oldMessage.channel.name}` })
			.setTimestamp();

		client.logger.addEntry("messages", { embeds: [embed.toJSON()] }, oldMessage.guild?.id || "");
	}
}