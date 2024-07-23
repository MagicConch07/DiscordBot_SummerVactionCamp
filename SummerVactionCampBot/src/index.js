import Discord from "discord.js";
import dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });
const TOKEN = process.env.TOKEN;

const client = new Discord.Client({
	intents: [
		Discord.GatewayIntentBits.Guilds,
		Discord.GatewayIntentBits.GuildMessages,
		Discord.GatewayIntentBits.MessageContent,
	],
});

client.once(Discord.Events.ClientReady, () => {
	console.log(`Log In Successful, Client is ${client.user.tag}`);
});

client.on(Discord.Events.MessageCreate, (msg) => {
	if (msg.content === "!Ping") {
		msg.channel.send("Pong!");
	}
});

client.login(TOKEN);
