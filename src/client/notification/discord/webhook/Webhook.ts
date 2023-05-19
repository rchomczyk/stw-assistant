import { EmbedMessage } from "../component/EmbedMessage";

export class Webhook {

    username: string
    embeds: Array<EmbedMessage>
    avatar?: string

    constructor(username: string, embeds: Array<EmbedMessage>, avatar?: string) {
        this.username = username
        this.avatar = avatar
        this.embeds = embeds
    }
}
