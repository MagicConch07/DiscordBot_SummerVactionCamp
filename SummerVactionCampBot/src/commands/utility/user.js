import { SlashCommandBuilder } from "discord.js";

/* export const userCommands = {
	data: new SlashCommandBuilder()
		.setName("user")
		.setDescription("Provides information about the user."),
	async execute(interaction) {
		await interaction.reply(
			`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`
		);
	},
}; */

export const data = new SlashCommandBuilder()
	.setName("user")
	.setDescription("Provides information about the user.");

export const execute = async (interaction) => {
	await interaction.reply(
		`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`
	);
};
