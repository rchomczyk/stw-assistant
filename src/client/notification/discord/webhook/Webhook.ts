import { EmbedMessage } from "../component/EmbedMessage";

export class Webhook {

    constructor(public username: string, public embeds: Array<EmbedMessage>, public content: string, public avatar?: string) {

    }
}
