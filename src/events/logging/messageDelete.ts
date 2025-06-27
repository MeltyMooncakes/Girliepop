import { AttachmentBuilder, ButtonInteraction, ChannelType, DMChannel, EmbedBuilder, GuildMember, Interaction, Message } from "discord.js";
import { DiscordClient } from "../..";
import Stream, { Readable } from "stream";

export class Event {
	type = "messageDelete";

	constructor() {}

	async run(client: DiscordClient, message: Message) {
		if (message.channel.type === ChannelType.DM) {
			return;
		}

		if (message.author === null) {
			return;
		}

		let files = [], content: string | null = message.content;

		if (message.content.length > 2048) {
			const buffer = Buffer.from(`${message.content}`)
			files.push(new AttachmentBuilder(buffer, { name: "content.txt"}));
			content = "Message content in attached file."
		}

		if (message.content.length === 0) {
			content = null;
		}

		const embed = new EmbedBuilder()
			.setColor("Red")
			.setAuthor({
				name: `@${message.author.username} (${message.author.id})`,
				iconURL: message?.member?.avatarURL() || message.author.avatarURL() || undefined,
			})
			.setDescription(content)
			.setImage(message.embeds.find(e => e.image !== null)?.image?.url || message.attachments.first()?.url || null)
			.setFooter({ text: `Message deleted in ${message.channel.name}` })
			.setTimestamp();

		

		client.logger.addEntry("messages", { embeds: [embed.toJSON()], files }, message.guild?.id || "");
	}
}