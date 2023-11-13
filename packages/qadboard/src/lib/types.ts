export type Card = {
    content: string,
    writer: string,
    id: number,
    reactions: {
        like: number
    }
}

export type Section = {
    name: string,
    id: number,
    color: string,
    card: Card[]
}

export type Board = {
    name: string,
    id: number,
    sections: Section[]
}