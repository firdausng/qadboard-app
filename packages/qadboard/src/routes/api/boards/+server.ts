import { json } from '@sveltejs/kit'
import type {Board} from "$lib/types";
// import {boards} from "../../../data/board";

type LoadData = {
    params: {
        boardId:string
    },
    platform: App.Platform
}
// async function getBoards() {
//
//     return boards
// }

export async function GET(loadData: LoadData) {
    console.log('loadData', loadData)
    const response = await loadData.platform.env.DB.prepare(`SELECT * FROM Boards`).run()
    const boards = response.results as Board[];
    // const boards = await getBoards()
    return json(boards)
}
