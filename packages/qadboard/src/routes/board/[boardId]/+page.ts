import { error } from '@sveltejs/kit'
import {boards} from "../../../data/board";

type LoadData = {
    params: {
        boardId:string
    },
    fetch: typeof fetch
}

export async function load({ params, fetch }: LoadData) {
    const response = await fetch(`/api/boards/${params.boardId}`);
    const board = await response.json();
    if(board){
        return {
            content: '',
            meta: {
                title: params.boardId
            },
            board
        }
    }else{
        throw error(404, `Could not find ${params.boardId}`)
    }
}
