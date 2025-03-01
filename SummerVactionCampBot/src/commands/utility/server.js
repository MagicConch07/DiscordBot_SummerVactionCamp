import { SlashCommandBuilder } from "discord.js";

/* export const serverCommands = {
	data: new SlashCommandBuilder()
		.setName("server")
		.setDescription("Provides information about the server."),
	async execute(interaction) {
		await interaction.reply(
			`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`
		);
	},
}; */

export const data = new SlashCommandBuilder()
	.setName("server")
	.setDescription("Provides information about the server.");

export const execute = async (interaction) => {
	await interaction.reply(
		`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`
	);
};
