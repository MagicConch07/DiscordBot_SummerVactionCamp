import {
	Client,
	Events,
	GatewayIntentBits,
	EmbedBuilder,
	ButtonStyle,
	ApplicationCommandType,
	ApplicationCommandOptionType,
	Collection,
} from "discord.js";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const TOKEN = process.env.TOKEN;

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.commadns = new Collection();

const commadnFiles = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));

for (const file of commadnFiles) {
    const commands
}

client.once(Events.ClientReady, async () => {
	console.log("봇이 준비되었습니다.");
});

client.on(Events.MessageCreate, async (msg) => {
	msg.reply({
		embeds: [
			new EmbedBuilder()
				.setTitle("타이틀 입니다.")
				.setDescription("설명 입니다.")
				.addFields([
					{ name: "필드1", value: "필드 1의 값" },
					{ name: "필드2", value: "필드 2의 값" },
				]),
		],
	});
});

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;
});

client.login(TOKEN);
