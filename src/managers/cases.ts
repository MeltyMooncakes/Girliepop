import { DiscordClient } from "..";
import { Manager } from "../structures/manager";

export class CaseManager extends Manager {
	id = "cases";
	enabled = true;
	category: string;

	constructor(client: DiscordClient) {
		super(client);
	}

	async createEntry(entry: CaseEntry) {
		console.log("bergegr");
		await this.client.db.collection("cases").insertOne({ ...entry });
	}

	async getEntriesByModerator(id: string) {
		return await this.client.db.collection("cases").find({ moderator: id }).toArray();
	}

	async getEntriesByUser(id: string) {
		return await this.client.db.collection("cases").find({ user: id }).toArray();
	}
}