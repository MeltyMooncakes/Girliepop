interface ClientConfig {
	embedColour: `#${string}`;
	showCategory: boolean;
	prefix: RegExp;
	developers: string[];
}

interface ClientSecrets {
	botToken: string;
	mongodbUri: string;
}

interface LoggingChannels {
	roles: string;
	members: string;
	messages: string;
	moderation: string;
}

type LogEntryType = keyof(LoggingChannels);

interface LogEntry {
	type: LogEntryType;
	serverId: string;
	message: object;
}

type CaseEntryType = "warning" | "ban" | "mute" | "kick" | "unban";

interface CaseEntry {
	type: CaseEntryType;
	user: string;
	reason: string;
	moderator: string;
	timestamp: number;
	server: string;
	manual: boolean;
}

interface SlashBasicInfo {
	name: string;
	description: string;
	nameLocalized: string;
	descriptionLocalized: string;
}