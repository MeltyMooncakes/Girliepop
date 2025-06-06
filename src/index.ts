import { Client, ClientOptions, CommandInteraction, EmbedBuilder, GatewayIntentBits, Message, Partials } from "discord.js";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { parse } from "yaml";
import { glob } from "glob";
import { resolve } from "path";
import { CommandManager } from "./managers/commands";
import { exit } from "process";
import { CaptchaManager } from "./managers/captcha";
import { Automod } from "./managers/automod";
import { LoggingManager } from "./managers/logging";


export class DiscordClient extends Client {
	secrets: ClientSecrets;
	config: ClientConfig;
	commands: CommandManager;
	captchas: CaptchaManager;
	logger: LoggingManager;
	automod: Automod;

	constructor(options: ClientOptions) {
		super(options);

		if (!existsSync("./configs/secrets.yaml")) {
			console.log("./configs/secrets.yaml was not found, creating base file.\nPlease set up this file before starting the bot.");
			writeFileSync("./configs/secrets.yaml", "botToken: INSERT-TOKEN-HERE", "utf-8");
			exit(1);	
		}

		this.secrets = parse(readFileSync("./configs/secrets.yaml", "utf-8"));
		this.config = parse(readFileSync("./configs/config.yaml", "utf-8"));
		this.config.prefix = new RegExp(this.config.prefix, "i");
		this.commands = new CommandManager(this);
		this.captchas = new CaptchaManager(this);
		this.logger = new LoggingManager(this);
		this.automod = new Automod(this);
	}

	async start() {
		for await (const eventFile of await glob(`${resolve(__dirname, "./")}/events/*`, {})) {
			const { Event } = await import(eventFile),
				event = new Event(this);

			this.on(event.type, (...args) => event.run(this, ...args));
		}

		this.login(this.secrets.botToken);
	}
}

const client = new DiscordClient({
	intents: [
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.DirectMessages
	],
	partials: [Partials.Message, Partials.GuildMember]
});

client.start();