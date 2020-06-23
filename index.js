require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("guildMemberAdd", (member) => {
	// Send the message to a designated channel on a server:
	const channel = member.guild.channels.cache.find((ch) => ch.name === "member-log");
	// Do nothing if the channel wasn't found on this server
	if (!channel) return;
	// Send the message, mentioning the member
	channel.send(`Buenas buenas, llegó ${member}`);
});

// barras
client.on("message", (message) => {
	switch (message) {
		case "sabes que" || "sabes qué?" || "sabes que?" || "hablale tú" || "hablale tú vale" || "di lo tuyo":
			message.channel.send("**barras**");
			break;
		case "!periodt":
			message.channel.send("es así hermanx");
			break;
		case "quieren ver mi avatar":
			message.channel.send(message.author.displayAvatarURL());
			break;
		case "!rip":
			const attachment = new MessageAttachment("https://i.imgur.com/w3duR07.png");
			// Send the attachment in the message channel
			message.channel.send(attachment);
			break;
		default:
			message.channel.send("_barras_");
			break;
	}
});

// kick people

client.on("message", (message) => {
	if (message.content.startsWith("!sacalo")) {
		const member = message.mentions.members.first();
		if (!member) {
			return message.reply(`Hermanx, pero mencionalx!!`);
		}
		if (!member.kickable) {
			return message.reply(`No vale más respeto`);
		}
		return member
			.kick({ reason: "Se comió la luz durísimo!" })
			.then(() => message.reply(`epa ${member.user.tag} fue sacado del servidor. f por ${member.user.tag}`))
			.catch((error) => message.reply(`mala mía`));
	}
});

// ban people

client.on("message", (message) => {
	if (!message.guild) return;

	if (message.content.startsWith("!ban")) {
		const user = message.mentions.users.first();

		if (user) {
			const member = message.guild.member(user);

			if (member) {
				member
					.ban({
						reason: "They were bad!"
					})
					.then(() => {
						message.reply(`Successfully banned ${user.tag}`);
					})
					.catch((err) => {
						// An error happened
						// This is generally due to the bot not being able to ban the member,
						// either due to missing permissions or role hierarchy
						message.reply("I was unable to ban the member");
						// Log the error
						console.error(err);
					});
			} else {
				// The mentioned user isn't in this guild
				message.reply("That user isn't in this guild!");
			}
		} else {
			// Otherwise, if no user was mentioned
			message.reply("You didn't mention the user to ban!");
		}
	}
});

client.login(process.env.BOT_TOKEN);
