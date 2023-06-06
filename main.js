import Discord, { Webhook } from 'discord.js';
const { Client, GatewayIntentBits, EmbedBuilder } = Discord;

import fs from 'fs'

import { getUser, addUser, deleteUser, rewriteUser, getUserjson } from './function/userFunc.js';
import { whoSolve } from './function/solvedFunc.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

const token = JSON.parse(fs.readFileSync('./token/token.json'));
client.login(token.token);

// help command
client.on('messageCreate', (message) => {
    if (message.content.startsWith('!help')) {

    }
})

// user command
client.on('messageCreate', (message) => {
    const guildId = message.guild.id;
    const userInfo = message.author.username + '#' + message.author.discriminator;

    // addme
    if (message.content.startsWith('!addme')) {
        const args = message.content.split(' ');

        const bojId = args[1];
        const users = getUserjson();

        if (users.hasOwnProperty(guildId) && users[guildId].hasOwnProperty(userInfo)) {
            message.author.send('이미 존재하는 회원입니다. 수정을 원하신다면 /rewriteme 를 사용하세요');
        }
        else if (!bojId) {
            message.author.send('백준id를 입력해주세요 /addme (백준id)');
        }
        else {
            addUser(userInfo, guildId, bojId);
            message.author.send('사용자 정보가 추가되었습니다.');
        }
    }

    //rewriteme
    else if (message.content.startsWith('!rewriteme')) {
        const args = message.content.split(' ');

        const bojId = args[1];
        const users = getUserjson();

        if (!users.hasOwnProperty(guildId)) {
            message.author.send('존재하지 않는 회원입니다.');
        }
        else if (!users[guildId].hasOwnProperty(userInfo)) {
            message.author.send('존재하지 않는 회원입니다.');
        }
        else if (!bojId) {
            message.author.send('수정할 아이디를 입력하세요');
        }
        else {
            rewriteUser(userInfo, guildId, bojId);
            message.author.send('사용자 정보를 수정했습니다.');
        }
    }

    // deleteme
    else if (message.content === '!deleteme') {
        const users = getUserjson();

        if (!users.hasOwnProperty(guildId)) {
            message.author.send('존재하지 않는 회원입니다.');
        }
        else if (!users[guildId].hasOwnProperty(userInfo)) {
            message.author.send('존재하지 않는 회원입니다.');
        }
        else {
            deleteUser(guildId, userInfo);
            message.author.send('사용자 정보가 삭제되었습니다.');
        }
    }

    // getme
    else if (message.content === '!getme') {
        const users = getUserjson();

        if (!users.hasOwnProperty(guildId)) {
            message.author.send('존재하지 않는 회원입니다.');
        }
        else if (!users[guildId].hasOwnProperty(userInfo)) {
            message.author.send('존재하지 않는 회원입니다.')
        }
        else {
            const bojId = getUser(guildId, userInfo);
            message.author.send(`${userInfo}: ${bojId}`);
        }
    }
});

// solve ac query
client.on('messageCreate', async (message) => {
    //whosolve
    if (message.content.startsWith('!whosolve')) {

        const args = message.content.split(' ');
        let state;
        const num = args[1];
        if (args.length <= 2) {
            state = true //default
        }
        else {
            state = args[2] == 'private' ? true : false;
        }
        const guildId = message.guild.id;
        const users = getUserjson();

        if (!num || !(3 <= num.length <= 6)) {
            message.author.send('올바른 문제번호를 입력해주세요');
        }
        else if (!users.hasOwnProperty(guildId)) {
            message.author.send('현재 등록된 사용자가 없습니다.');
        }
        else {
            const result = await whoSolve(num, guildId);
            let descrip;
            if (result.length > 0 && result[0] == -1) {
                descrip = result[1];
            }
            else if (result.length == 0) {
                descrip = '이 문제를 푼 사람이 없습니다';
            }
            else {
                descrip = result.join(', ');
            }
            const embed = {
                title: `${num}을 푼 사람`,
                color: 0x0099FF,
                url: `https://www.acmicpc.net/problem/${num}`,
                description: `${descrip}`
            }
            if (state) { // private
                message.author.send({ embeds: [embed] });
            }
            else {
                message.reply({ embeds: [embed] });
            }

        }
    }
})