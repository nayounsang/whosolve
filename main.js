import Discord, { Webhook } from 'discord.js';
const { Client, GatewayIntentBits, EmbedBuilder } = Discord;

import fs from 'fs'

import commands from './command/command.js';
import { getMe, rewriteMe, addMe, deleteMe, help, whoSolveCommand } from './function/commandFunc.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

client.once('ready', () => {
    client.guilds.cache.forEach((guild) => {
        commands.forEach((command) => {
            guild.commands.create(command)
                .then((command) => console.log(`Command registered in guild ${guild.name}: ${command.name}`))
                .catch((error) => console.error(`Failed to register command in guild ${guild.name}:`, error));
        })
    });
    console.log(`Logged in as ${client.user.tag}`);
});

const token = JSON.parse(fs.readFileSync('./token/token.json'));
client.login(token.token);

//user
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    if (commandName == 'addme') {
        await addMe(interaction);
    } else if (commandName == 'rewriteme') {
        await rewriteMe(interaction);
    } else if (commandName == 'deleteme') {
        await deleteMe(interaction);
    } else if (commandName == 'getme') {
        await getMe(interaction);
    }

})

//help
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    if (commandName == 'help') {
        await help(interaction);
    }
})

// whosolve
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    if (commandName == 'whosolve') {
        await whoSolveCommand(interaction);
    }
})