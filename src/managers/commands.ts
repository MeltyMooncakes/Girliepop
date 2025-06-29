import { readdirSync } from "fs";
import { glob } from "glob";
import { resolve } from "path";
import { DiscordClient } from "../";
import { CollectionManager } from "../structures/manager";
import Command from "../structures/command";

export class CommandManager extends CollectionManager<string, Command> {
	id = "commands";
	enabled = true;
	category: string;

	constructor(client: DiscordClient) {
		super(client);
		this.init();
	}

	async init() {
		for await (const category of readdirSync("./src/commands")) {
			const commandFiles = await glob(`${resolve(__dirname, "../")}/commands/${category}/*`, {});

			for await (const commandPath of commandFiles) {
				const { Command } = await import(commandPath),
					command = new Command(this.client);
					
				command.setup();

				command.category = category;
				command.path = commandPath;
				console.log(command.slash);

				this.set(command.name, command);
			}
		}

		console.log(`[MANAGER] ${this.client.commands.size} Commands loaded.`);
	}
}