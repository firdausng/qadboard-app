import type {Board} from "$lib/types";

export const boards: Board[] = [
    {
        name: 'test',
        id: 1,
        sections: [
            {
                name: 'What we have done well',
                color: 'green',
                id: 1,
                card: [
                    {
                        content: 'Thank you Firdaus for support me when new cluster having issue even weekend support me.',
                        reactions:{
                            like: 2
                        },
                        writer: 'Isaac',
                        id: 1
                    },
                    {
                        content: 'Thanks Firdaus for created a firm base for EP project before transfer back to Mesh and Connect.',
                        reactions: {
                            like: 4
                        },
                        writer: 'Kane',
                        id: 2
                    },
                    {
                        content: 'Thanks Kane/Kensley/John for awesome onboarding to EP + Bravos to Azwan for soloing testing & e2e',
                        reactions: {
                            like: 1
                        },
                        writer: 'Steven',
                        id: 3
                    },
                    {
                        content: 'Thanks Kane/Kensley/John for awesome onboarding to EP + Bravos to Azwan for soloing testing & e2e',
                        reactions: {
                            like: 1
                        },
                        writer: 'Steven',
                        id: 4
                    },
                    {
                        content: 'Thank you Firdaus for support me when new cluster having issue even weekend support me.',
                        reactions:{
                            like: 2
                        },
                        writer: 'Isaac',
                        id: 5
                    },
                    {
                        content: 'Thanks Steven and Azwan for great contribution on EP project and cover me up on and off. Appreciated that.',
                        reactions: {
                            like: 1
                        },
                        writer: 'Kane',
                        id: 6
                    },
                    {
                        content: 'Thanks Steven and Azwan for great contribution on EP project and cover me up on and off. Appreciated that.',
                        reactions: {
                            like: 1
                        },
                        writer: 'Kane',
                        id: 7
                    }
                ]
            },
            {
                name: 'What didn\'t go so well',
                color: 'red',
                id: 2,
                card: [
                    {
                        content: 'Quite messy when the EP project staging open to let other project\'user/tester to start testing. Some of them not understand the flow,',
                        reactions: {
                            like: 1
                        },
                        writer: 'Kane',
                        id: 1
                    },
                ]
            },
            {
                name: 'How can we improve',
                color: 'blue',
                id: 3,
                card: [
                    {
                        content: 'One thing on pinging others for help, we should try solving ourselves first before taking others time.\n' +
                            'Found questions were answered before and come back with the same question after while.\n' +
                            'Found questions that a simple Googling or chat-gpt or referring to the ticket would answer.',
                        reactions: {
                            like: 7
                        },
                        writer: '',
                        id: 1
                    },
                    {
                        content: 'One thing on pinging others for help, we should try solving ourselves first before taking others time.\n' +
                            'Found questions were answered before and come back with the same question after while.\n' +
                            'Found questions that a simple Googling or chat-gpt or referring to the ticket would answer.',
                        reactions: {
                            like: 7
                        },
                        writer: '',
                        id: 2
                    },
                ]
            },
            // {
            //     name: 'asaas',
            //     color: 'blue',
            //     card: [
            //         {
            //             content: 'One thing on pinging others for help, we should try solving ourselves first before taking others time.\n' +
            //                 'Found questions were answered before and come back with the same question after while.\n' +
            //                 'Found questions that a simple Googling or chat-gpt or referring to the ticket would answer.',
            //             reactions: {
            //                 like: 7
            //             },
            //             writer: ''
            //         }
            //     ]
            // },
        ]
    },
    {
        name: 'test2',
        id: 2,
        sections: []
    },
    {
        name: 'test3',
        id: 3,
        sections: []
    },
    {
        name: 'test4',
        id: 4,
        sections: []
    }
]