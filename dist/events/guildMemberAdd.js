"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const errors_1 = require("../errors");
class Event {
    type = "guildMemberAdd";
    constructor() { }
    // TODO move to verification process
    async run(client, member) {
        // if account is younger than 30 days.
        if ((Date.now() - (member?.joinedTimestamp || 2592e6)) < 2592e6) {
            // attempt to DM the user informing them.
            try {
                const dmChannel = await member.createDM();
                await dmChannel.send({
                    embeds: [errors_1.AccountNotOldEnough]
                });
            }
            catch (e) {
                console.log(`${member.id} could not be DM'ed.`);
            }
            return await member.kick("Account created less than 30 days ago.");
        }
    }
}
exports.Event = Event;
