"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyVerified = exports.CouldNotDM = exports.AccountNotOldEnough = exports.NotDeveloper = exports.UnknownCategory = void 0;
const discord_js_1 = require("discord.js");
exports.UnknownCategory = new discord_js_1.EmbedBuilder()
    .setTitle("Error: Unknown category.")
    .setColor("Red");
exports.NotDeveloper = new discord_js_1.EmbedBuilder()
    .setTitle("Error: This command is only for developers.")
    .setColor("Red");
exports.AccountNotOldEnough = new discord_js_1.EmbedBuilder()
    .setTitle("Error: Your account is not old enough.")
    .setDescription("You have been kicked from the Girls server for the reason: `Account age less than 30 days.`")
    .setColor("Red");
exports.CouldNotDM = new discord_js_1.EmbedBuilder()
    .setTitle("Error: Could not DM.")
    .setDescription("I could not create a DM Channel with you.")
    .setColor("Red");
exports.AlreadyVerified = new discord_js_1.EmbedBuilder()
    .setTitle("Error: Already verified.")
    .setDescription("You are already verfied.")
    .setColor("Red");
