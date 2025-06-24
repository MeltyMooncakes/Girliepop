import { AttachmentBuilder, ButtonInteraction, ChannelType, DMChannel, EmbedBuilder, GuildMember, Interaction, Message } from "discord.js";
import { DiscordClient } from "../..";

export class Event {
	type = "messageDelete";

	constructor() {}

	async run(client: DiscordClient, message: Message) {
		if (message.channel.type === ChannelType.DM) {
			return;
		}

		if (message.user === null) {
			return;
		}

		const embed = new EmbedBuilder()
			.setColor("Red")
			.setAuthor({
				name: `@${message.author.username} (${message.author.id})`,
				iconURL: message?.member?.avatarURL() || message.author.avatarURL() || undefined,
			})
			.setDescription(message.content)
			.setImage(message.embeds.find(e => e.image !== null)?.image?.url || message.attachments.first()?.url || null)
			.setFooter({ text: `Message deleted in ${message.channel.name}` })
			.setTimestamp();

		client.logger.addEntry("messages", { embeds: [embed.toJSON()] }, message.guild?.id || "");
	}
}