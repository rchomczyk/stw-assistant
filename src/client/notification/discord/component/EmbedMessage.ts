export class EmbedMessage {

    title: string
    color: number
    description: string
    footer?: EmbedFooter
    author?: EmbedAuthor

    constructor(title: string, color: number, description: string, footer?: EmbedFooter, author?: EmbedAuthor) {
        this.title = title
        this.color = color
        this.description = description
        this.footer = footer
        this.author = author
    }
}

export class EmbedAuthor {

    name: string;
    icon_url: string;

    constructor(name: string, icon_url: string) {
        this.name = name
        this.icon_url = icon_url
    }
}

export class EmbedFooter {

    text: string;
    icon_url: string;

    constructor(text: string, icon_url: string) {
        this.text = text
        this.icon_url = icon_url
    }
}