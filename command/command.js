const commands = [
    {
        name: 'help',
        description: '봇 사용 도움말',
    },
    {
        name: 'addme',
        description: '자신의 백준id 등록',
        options: [
            {
                name: 'bojid',
                description: '백준id',
                type: 3,
                required: true,
            },
        ],
    },
    {
        name: 'rewriteme',
        description: '등록된 백준id 수정',
        options: [
            {
                name: 'bojid',
                description: '백준id',
                type: 3,
                required: true,
            },
        ]
    },
    {
        name: 'deleteme',
        description: '자신의 정보 삭제',
    },
    {
        name: 'getme',
        description: '내정보 불러오기',
    },
    {
        name: 'whosolve',
        description: '해당 백준 문제를 누가 풀었는가',
        options: [
            {
                name: 'num',
                description: '문제번호',
                type: 3,
                required: true,
            },
        ]
    },
]

export default commands;