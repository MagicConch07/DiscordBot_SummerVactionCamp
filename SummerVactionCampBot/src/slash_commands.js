import { REST, Routes } from "discord.js";

const botID = "1264822024057126923";
const serverID = "1149352888011870350";
const botToken = process.env.TOKEN;

const rest = new REST().setToken(botToken);
const slashRegister = async () => {
	try {
		await rest.put(Routes.applicationGuildCommands(botID, serverID), {
			body: [descri],
		});
	} catch (err) {
		console.log(err);
	}
};
