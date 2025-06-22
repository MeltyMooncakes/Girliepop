import { Client, ClientOptions, CommandInteraction, EmbedBuilder, GatewayIntentBits, Message, Options, Partials } from "discord.js";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { parse } from "yaml";
import { glob } from "glob";
import { resolve } from "path";
import { CommandManager } from "./managers/commands";
import { exit } from "process";
import { CaptchaManager } from "./managers/captcha";
import { Automod } from "./managers/automod";
import { LoggingManager } from "./managers/logging";
import { Db, MongoClient, ServerApiVersion } from "mongodb";
import { CaseManager } from "./managers/cases";
import { Publisher } from "./managers/publisher";


export class DiscordClient extends Client {
	secrets: ClientSecrets;
	config: ClientConfig;
	commands: CommandManager;
	captchas: CaptchaManager;
	publisher: Publisher;
	
	logger: LoggingManager;
	automod: Automod;
	cases: CaseManager;

	mongo: MongoClient;
	db: Db;

	captchaDisabled: boolean = false;

	constructor(options: ClientOptions) {
		super(options);


		if (process.argv.some(a => /-disablecaptchas/gi.test(a))) {
			console.log("Captchas have been disabled for this instance.");
			this.captchaDisabled = true;
		}

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
		this.publisher = new Publisher(this);

		this.logger = new LoggingManager(this);
		this.cases = new CaseManager(this);
		this.automod = new Automod(this);

		this.mongo = new MongoClient(this.secrets.mongodbUri, {
			serverApi: {
				version: ServerApiVersion.v1,
				strict: true,
				deprecationErrors: true,
			},
		});
		this.db = this.mongo.db("girls");
	}

	async start() {
		for await (const eventFile of await glob(`${resolve(__dirname, "./")}/events/*/*`, {})) {
			const { Event } = await import(eventFile),
				event = new Event(this);

			this.on(event.type, (...args) => event.run(this, ...args));
		}

		await this.mongo.connect();
		await this.mongo.db("admin").command({ ping: 1 });

		this.login(this.secrets.botToken);
	}
}

const client = new DiscordClient({
	sweepers: {
		...Options.DefaultSweeperSettings,
		messages: {
			lifetime: 3600,
			interval: 3600
		}
	},
	intents: [
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildModeration
	],
	partials: [Partials.Message, Partials.GuildMember]
});

client.start();