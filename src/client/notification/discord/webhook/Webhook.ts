import { EmbedMessage } from "../component/EmbedMessage";

export class Webhook {

    username: string
    content: string
    embeds: Array<EmbedMessage>
    avatar?: string

    constructor(username: string, content: string, embeds: Array<EmbedMessage>, avatar?: string) {
        this.username = username
        this.content = content
        this.avatar = avatar
        this.embeds = embeds
    }
}
