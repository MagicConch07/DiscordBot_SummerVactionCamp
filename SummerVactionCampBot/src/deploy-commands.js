import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config({ path: "./src/.env" });
const ClientID = process.env.CLIENT_ID;
const TOKEN = process.env.TOKEN;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const Commands = async () => {
	const commands = [];
	const folderPath = path.join(__dirname, "commands");
	const commandFolders = fs.readdirSync(folderPath);

	for (const folder of commandFolders) {
		const commandsPath = path.join(folderPath, folder);
		const commandFiles = fs
			.readdirSync(commandsPath)
			.filter((file) => file.endsWith(".js"));

		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, folder, file);
			const fileUrl = `file://${filePath.replace(/\\/g, "/")}`;
			const command = await import(fileUrl);

			if ("data" in command && "execute" in command) {
				commands.push(command.data.toJSON());
			} else {
				console.log(
					`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
				);
			}
		}
	}

	const rest = new REST().setToken(TOKEN);
	try {
		console.log(
			`Started refreshing ${commands.length} application (/) commands.`
		);
		const data = await rest.put(Routes.applicationCommands(ClientID), {
			body: commands,
		});
		console.log(
			`Successfully reloaded ${data.length} application (/) commands.`
		);
	} catch (error) {
		console.error(error);
	}
};
