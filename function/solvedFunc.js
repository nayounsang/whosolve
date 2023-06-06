import { getUserjson } from './userFunc.js';

function updateUserResult(arr,val){
    arr.push(val);
    return arr;
}

export async function whoSolve(num, guildId) {
    let result = [];
    let users = getUserjson();
    for (let user in users[guildId]) {
        let memberId = users[guildId][user].bojId;
        await fetch(`https://solved.ac/api/v3/search/problem?query=%40${memberId}+id%3A${num}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.count > 0){
                    const updatedResult = updateUserResult(result,user);
                    result.splice(0, result.length, ...updatedResult);
                }
            })
            .catch(error => {
                return [-1,`api를 처리하는 중 오류가 발생했습니다: ${error}`];
            });
    };
    return result;
}