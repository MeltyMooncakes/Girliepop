import { ApplicationCommand, SlashCommandBuilder } from "discord.js";
import { DiscordClient } from "..";
import DiscordCommand from "../structures/command";
import { Manager } from "../structures/manager";

export class Publisher extends Manager {
	id = "publisher";
	enabled = true;
	category: string;

	constructor(client: DiscordClient) {
		super(client);
	}

	async publish(command: DiscordCommand) {
		const possibleCommand = this.client.application?.commands.cache.get(command.name);

		if (possibleCommand && this.compare(command.slash, possibleCommand)) {
			return;
		}

		console.log(`[PUBLISH] Attempting to publish command: ${command.name}.`);
		try {
			await this.client.application?.commands.create(command.slash)
		} catch (e) {
			console.log(`[PUBLISH] Failed to publish command: ${command.name}.`);
			return console.error(e);
		}

		console.log(`[PUBLISH] Published command successfully: ${command.name}.`);
	}

	// returns true if its the same
	compare(newCommand: SlashCommandBuilder, oldCommand: ApplicationCommand): boolean {
		const basicInfo = this.compareBasicInfo(newCommand, oldCommand)
			&& newCommand.default_member_permissions === oldCommand.defaultMemberPermissions
			// if im ever asked to make a command that is nsfw i will quit
			// but im putting this here for the sake of it being fully functional
			&& newCommand.nsfw === oldCommand.nsfw;

		if (newCommand.options.length !== oldCommand.options.length) {
			return false;
		}

		return basicInfo && newCommand.options.every(v =>
			this.compareBasicInfo(v.toJSON(), oldCommand.options.find(c => c.name === v.toJSON().name))
		);
	}

	// i hate any but whatever
	compareBasicInfo(a: any, b: any) {
		return a.name === b.name
			&& a.description === b.description;
	}
}