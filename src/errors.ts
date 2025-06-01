import { EmbedBuilder } from "discord.js";

export const UnknownCategory = new EmbedBuilder()
	.setTitle("Error: Unknown category.")
	.setColor("Red")

export const NotDeveloper = new EmbedBuilder()
	.setTitle("Error: This command is only for developers.")
	.setColor("Red")

export const AccountNotOldEnough = new EmbedBuilder()
	.setTitle("Error: Your account is not old enough.")
	.setDescription("You have been kicked from the Girls server for the reason: `Account age less than 30 days.`")
	.setColor("Red")

export const CouldNotDM = new EmbedBuilder()
	.setTitle("Error: Could not DM.")
	.setDescription("I could not create a DM Channel with you.")
	.setColor("Red")

export const AlreadyVerified = new EmbedBuilder()
	.setTitle("Error: Already verified.")
	.setDescription("You are already verfied.")
	.setColor("Red")

export const AlreadyVerifying = new EmbedBuilder()
	.setTitle("Error: Already verifying.")
	.setDescription("You already have a pending captcha.")
	.setColor("Red")

export const VerificationTimedOut = new EmbedBuilder()
	.setTitle("Error: Timed out.")
	.setDescription("Your captcha has timed out.")
	.setColor("Red")