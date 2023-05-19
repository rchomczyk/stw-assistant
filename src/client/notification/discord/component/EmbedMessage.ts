export class EmbedMessage {

    title: string
    color: number
    fields: Array<EmbedField>
    description?: string
    timestamp?: string
    thumbnail?: EmbedThumbnail
    footer?: EmbedFooter
    author?: EmbedAuthor

    constructor(title: string, color: number, fields: Array<EmbedField>, description?: string, timestamp?: string, thumbnail?: EmbedThumbnail, footer?: EmbedFooter, author?: EmbedAuthor) {
        this.title = title
        this.color = color
        this.fields = fields
        this.description = description
        this.timestamp = timestamp
        this.thumbnail = thumbnail
        this.footer = footer
        this.author = author
    }
}

export class EmbedAuthor {

    name: string
    icon_url: string

    constructor(name: string, icon_url: string) {
        this.name = name
        this.icon_url = icon_url
    }
}

export class EmbedFooter {

    text: string
    icon_url: string

    constructor(text: string, icon_url: string) {
        this.text = text
        this.icon_url = icon_url
    }
}

export class EmbedField {

    name: string
    value: string
    inline: boolean

    constructor(name: string, value: string, inline: boolean) {
        this.name = name
        this.value = value
        this.inline = inline
    }
}

export class EmbedThumbnail {

    url: string

    constructor(url: string) {
        this.url = url
    }
}