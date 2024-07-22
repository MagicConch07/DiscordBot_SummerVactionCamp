import Discord from "discord.js";
import config from "../config.json" assert { type: "json" };

const client = new Discord.Client({
	intents: [Discord.GatewayIntentBits.Guilds],
});

client.once(Discord.Events.ClientReady, () => {
	console.log(`Log In Successful, Client is ${client.user.tag}`);
});

client.login(config.token);
