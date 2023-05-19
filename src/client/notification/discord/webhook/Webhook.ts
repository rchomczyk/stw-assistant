import { EmbedMessage } from "../component/EmbedMessage";

export class Webhook {

    username: string
    embeds: Array<EmbedMessage>
    content: string
    avatar?: string

    constructor(username: string, embeds: Array<EmbedMessage>, content: string, avatar?: string) {
        this.username = username
        this.embeds = embeds
        this.content = content
        this.avatar = avatar
    }
}
