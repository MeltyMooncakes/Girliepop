interface ClientConfig {
	embedColour: `#${string}`;
	showCategory: boolean;
	prefix: RegExp;
	developers: string[];
}

interface ClientSecrets {
	botToken: string;
}

interface LoggingChannels {
	roles: string;
	members: string;
}

type LogEntryType = keyof(LoggingChannels);

interface LogEntry {
	type: LogEntryType;
	embed: object;
	id: string;
}