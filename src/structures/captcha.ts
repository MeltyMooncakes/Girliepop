import { execSync } from "child_process";
import { AttachmentBuilder, ButtonInteraction, DMChannel, EmbedBuilder, Message, messageLink } from "discord.js";
import { DiscordClient } from "..";
import { CaptchaManager } from "../managers/captcha";
import { VerificationTimedOut } from "../errors";

export default class Captcha {
	client: DiscordClient;

	value: string;
	buffer: Buffer;
	interaction: ButtonInteraction;

	captchaMessage: Message;
	attempts: number = 0;
	exp: RegExp;

	dmChannel: DMChannel;

	timeout: NodeJS.Timeout;

	constructor(client: DiscordClient, interaction: ButtonInteraction) {
		this.client = client;
		this.interaction = interaction;
		this.timeout = setTimeout(async () => {
			console.log(`[VERIFY] [${interaction.user.id}] Captcha has timed out.`);
			this.end();
			try {
				this.dmChannel.send({
					embeds: [VerificationTimedOut],
				});
			} catch (e) {
				console.log(`[VERIFY] [${interaction.user.id}] Captcha has failed for reason: Could not DM.`);
			}
		}, 3e4);
	}

	async generate(): Promise<Captcha> {
		const captcha = execSync(`./tools/captcha`).toString().split("\n");

		this.buffer = Buffer.from(captcha[1].split(",")[1], "base64");
		this.value = captcha[0];
		this.exp = new RegExp(this.value, "i");

		console.log(`[VERIFY] [${this.interaction.user.id}] Creating captcha for user.`);

		return this;
	}

	async sendMessage(dmChannel: DMChannel) {
		this.dmChannel = dmChannel;
		this.captchaMessage = await dmChannel.send({
			embeds: [
				new EmbedBuilder()
					.setTitle("Captcha")
					.setImage("attachment://captcha.png")
					.setDescription("Type out the following characters to verify!")
			],
			files: [new AttachmentBuilder(this.buffer, { name: "captcha.png" })]
		});
	}

	async collect(m: Message) {
		if (this.exp.test(m.content)) {
			return this.complete(m);
		}

		this.attempts++;
		console.log(`[VERIFY] [${this.interaction.user.id}] Captcha prompt incorrect, ${5 - this.attempts} attempts remaining.`);
		return m.reply(`Incorrect string of characters, \`${5 - this.attempts}\` attempts remaining.`)
	}

	async complete(m: Message) {
		(await this.client.guilds
			.cache.get("1231247596459130974")
			?.members.fetch(this.interaction.user.id)
		)?.roles.add("1231247596471717908");

		await m.reply({
			content: "Verification completed, Welcome to the server!",
		});

		console.log(`[VERIFY] [${this.interaction.user.id}] Verification for user has completed.`);

		this.end();
	}

	end() {
		clearTimeout(this.timeout);
		this.client.captchas.delete(this.interaction.id);
	}
}