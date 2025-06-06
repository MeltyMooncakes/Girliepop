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
}

type LogEntryType = keyof(LoggingChannels);

interface LogEntry {
	type: LogEntryType;
	serverId: string;
	embed: object;
}