import fs from 'fs'
import { jsonDir } from '../mypath.js';
import path from 'path';

const userjsonDir = path.join(jsonDir,"/users.json");

export function getUserjson() {
    return JSON.parse(fs.readFileSync(userjsonDir));
}



export function addUser(userId, guildId, bojId) {

    let users = getUserjson();

    if (!users.hasOwnProperty(guildId)) {
        users[guildId] = {};
    }
    if (!users[guildId].hasOwnProperty(userId)) {
        users[guildId][userId] = {};
    }
    users[guildId][userId].bojId = bojId;
    fs.writeFileSync(userjsonDir, JSON.stringify(users, null, 2));
}


export function deleteUser(guildId, userId) {

    let users = getUserjson();

    if (users.hasOwnProperty(guildId) && users[guildId].hasOwnProperty(userId)) {
        delete users[guildId][userId];
    }

    fs.writeFileSync(userjsonDir, JSON.stringify(users, null, 2));
}

export function getUser(guildId, userId) {
    let users = getUserjson();
    if (users.hasOwnProperty(guildId) && users[guildId].hasOwnProperty(userId)) {
        return users[guildId][userId].bojId;
    }
}

export function rewriteUser(userId, guildId, bojId) {

    let users = getUserjson();

    users[guildId][userId].bojId = bojId;
    fs.writeFileSync(userjsonDir, JSON.stringify(users, null, 2));
}