import { json } from '@sveltejs/kit'
import type {Board} from "$lib/types";
import {boards} from "../../../../data/board";

type GetData = {
    params: {
        boardId:string
    },
}

async function getBoardWithId(boardId: string) {

    return boards.find(b => b.name === boardId);
}

export async function GET({params}: GetData) {
    const boards = await getBoardWithId(params.boardId)
    return json(boards)
}
