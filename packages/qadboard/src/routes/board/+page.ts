import { error } from '@sveltejs/kit'
import {boards} from "../../data/board";
import type {Board} from "$lib/types";

type LoadData = {
    params: {
        boardId:string
    },
    platform: App.Platform
}

export async function load(loadData: LoadData) {
    try {
        console.log('loadData', loadData)
        const response = await loadData.platform.env.DB.prepare(`SELECT * FROM Boards`).run()
        const board = response.results as Board[];
        return {
            content: '',
            meta: {
                title: 'board'
            },
            board: board
        }
    }catch (e) {
        throw error(404, `Error: ${e}, ${loadData.platform}`)
    }

}
