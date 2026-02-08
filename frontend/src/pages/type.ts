export interface ResponseApiMessages {
  data: IMessage[]
}

export interface IMessage {
    id: number
    chat_id: number
    type: "user" | "bot";
    content: string
    created_at: string
}

export interface ResponseApiAI {
    data: IMessageAI
}

export interface IMessageAI {
    prompt: string
    response: string
    // detai:Detail
}