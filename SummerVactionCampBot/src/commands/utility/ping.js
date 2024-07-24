import { SlashCommandBuilder } from "discord.js";

/* export const pingCommands = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with Pong!"),
	async execute(interaction) {
		await interaction.reply("Pong!");
	},
}; */

export const data = new SlashCommandBuilder()
	.setName("ping")
	.setDescription("Replies with Pong!");

export const execute = async (interaction) => {
	await interaction.reply("Pong!");
};
