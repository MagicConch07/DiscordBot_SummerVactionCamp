import fs from "node:fs";
import path from "node:path";
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { Commands } from "./deploy-commands.js";

dotenv.config({ path: "./src/.env" });
const TOKEN = process.env.TOKEN;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
	intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

const loadCommands = async () => {
	const foldersPath = path.join(__dirname, "commands");
	const commandFolders = fs.readdirSync(foldersPath);

	for (const folder of commandFolders) {
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs
			.readdirSync(commandsPath)
			.filter((file) => file.endsWith(".js"));

		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, folder, file);
			const fileUrl = `file://${filePath.replace(/\\/g, "/")}`;
			const command = await import(fileUrl);

			if ("data" in command && "execute" in command) {
				client.commands.set(command.data.name, command);
				console.log(`Loaded command: ${command.data.name}`);
			} else {
				console.log(
					`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
				);
			}
		}
	}
};

client.once(Events.ClientReady, async () => {
	console.log(`Log In Successful, Client is ${client.user.tag}`);
	await Commands();
});

client.on(Events.InteractionCreate, async (interaction) => {
	console.log("이거 안되냐?");

	if (!interaction.isChatInputCommand()) return;

	console.log("이거 됨?");

	const command = interaction.client.commands.get(interaction.commandName);

	console.log(command);

	if (!command) {
		console.error(
			`No command matching ${interaction.commandName} was found.`
		);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.log(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: "There was an error executing this command!",
				ephemeral: true,
			});
		} else {
			await interaction.reply({
				content: "There was an error while executing this command!",
				ephemeral: true,
			});
		}
	}
});

loadCommands();

client.login(TOKEN);
