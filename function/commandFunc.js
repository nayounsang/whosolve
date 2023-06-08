import {
    getUserjson,
    addUser,
    deleteUser,
    rewriteUser,
    getUser
} from "./userFunc.js";
import { whoSolve } from "./solvedFunc.js";

export async function addMe(interaction) {
    const bojid = interaction.options.getString('bojid');
    const users = getUserjson();
    const guildId = interaction.guildId;
    const username = interaction.user.username;

    if (users.hasOwnProperty(guildId) && users[guildId].hasOwnProperty(username)) {
        interaction.reply('이미 존재하는 회원입니다. 수정을 원하신다면 /rewriteme 를 사용하세요');
    }
    else if (!bojid) {
        interaction.reply('백준id를 입력해주세요');
    }
    else {
        addUser(username, guildId, bojid);
        interaction.reply('사용자 정보가 추가되었습니다.');
    }
}

export async function deleteMe(interaction) {
    const users = getUserjson();
    const guildId = interaction.guildId;
    const username = interaction.user.username;

    if (!users.hasOwnProperty(guildId)) {
        interaction.reply('존재하지 않는 회원입니다.');
    }
    else if (!users[guildId].hasOwnProperty(username)) {
        interaction.reply('존재하지 않는 회원입니다.');
    }
    else {
        deleteUser(guildId, username);
        interaction.reply('사용자 정보가 삭제되었습니다.');
    }

}

export async function rewriteMe(interaction) {
    const bojid = interaction.options.getString('bojid');
    const users = getUserjson();
    const guildId = interaction.guildId;
    const username = interaction.user.username;

    if (!users.hasOwnProperty(guildId)) {
        interaction.reply('존재하지 않는 회원입니다.');
    }
    else if (!users[guildId].hasOwnProperty(username)) {
        interaction.reply('존재하지 않는 회원입니다.');
    }
    else if (!bojid) {
        interaction.reply('수정할 아이디를 입력하세요');
    }
    else {
        rewriteUser(username, guildId, bojid);
        interaction.reply(`사용자 정보를 ${bojid}로 수정했습니다.`);
    }
}

export async function getMe(interaction) {
    const users = getUserjson();
    const guildId = interaction.guildId;
    const username = interaction.user.username;

    if (!users.hasOwnProperty(guildId)) {
        interaction.reply('존재하지 않는 회원입니다.');
    }
    else if (!users[guildId].hasOwnProperty(username)) {
        interaction.reply('존재하지 않는 회원입니다.')
    }
    else {
        const bojid = getUser(guildId, username);
        interaction.reply(`${username}: ${bojid}`);
    }

}

export async function whoSolveCommand(interaction) {
    const users = getUserjson();
    const guildId = interaction.guildId;
    let num = interaction.options.getInteger('num');
    console.log(num);

    if (!num || num < 1000) {
        interaction.reply('올바른 문제번호를 입력해주세요');
    } else if (!users.hasOwnProperty(guildId)) {
        interaction.reply('현재 등록된 사용자가 없습니다.');
    } else {
        const result = await whoSolve(num, guildId);
        num = String(num);
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
        interaction.reply({ embeds: [embed] });
    }

}

export async function help(interaction) {
    const embed = {
        title: `명령어 목록`,
        color: 0x0099FF,
        url: 'https://github.com/nayounsang/whosolve',
        description: '!whosolve (백준번호)를 입력하면 해당 백준번호를 푼 사람들을 알려줍니다. 그 전에 !addme (백준id)로 봇에 자신을 추가해주세요',
        fields: [
            { name: '!addme (bojid)', value: '봇에 자신의 bojid를 추가합니다. discord프로필과 1대1매칭됩니다. 이용을 원하신다면 해당 명령어를 사용해주세요' },
            { name: '!rewriteme (bojid)', value: '기존에 봇에 있던 bojid를 새로 수정합니다.' },
            { name: '!deleteme', value: '봇에 있는 자신의 정보를 삭제합니다.' },
            { name: '!getme', value: '자신의 정보를 확인합니다.' },
            { name: '!whosolve (problem number) (public)', value: '봇에 등록된 사람중 해당 백준 문제를 푼 사람을 알려줍니다. 뒤에 pubplic을 적는다면 서버에 보냅니다.' },
        ],
        footer: {
            text: '링크를 누르면 깃허브로 이동합니다.'
        },
    }
    interaction.reply({ embeds: [embed] });
}
