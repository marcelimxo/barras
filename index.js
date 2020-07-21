require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("guildMemberAdd", (member) => {
	// Send the message to a designated channel on a server:
	const channel = member.guild.channels.cache.find((ch) => ch.name === "mecanografía");
	// Do nothing if the channel wasn't found on this server
	if (!channel) return;
	// Send the message, mentioning the member
	channel.send(`Tenemos a ${member} en #migraciones`);
});

// barras
client.on("message", (message) => {
	// If the message is "ping"
	if (
		message.content === "sabes que" ||
		message.content === "sabes qué?" ||
		message.content === "hablale tú" ||
		message.content === "sabes que?" ||
		message.content === "di lo tuyo"
	) {
		// Send "pong" to the same channel
		message.channel.send("**barras**");
	} else if (message.content === "!periodt") {
		message.channel.send("es así hermanx");
	}
});

// vean mi avatar

client.on("message", (message) => {
	if (message.content === "quieren ver mi avatar") {
		// Send the user's avatar URL
		message.reply(message.author.displayAvatarURL());
	}
});

client.on("message", (message) => {
	// If the message is '!rip'
	if (message.content.startsWith("!rip")) {
		// Create the attachment using MessageAttachment
		const attachment = new MessageAttachment("https://i.imgur.com/w3duR07.png");
		// Send the attachment in the message channel
		message.channel.send(attachment);
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
			.then(() => message.reply(`epa ${member.user.username} fue sacado del servidor.`))
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
