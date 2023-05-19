export class EmbedMessage {

    constructor(public title: string,
                public color: number,
                public fields: Array<EmbedField>,
                public description?: string,
                public timestamp?: string,
                public thumbnail?: EmbedThumbnail,
                public footer?: EmbedFooter,
                public author?: EmbedAuthor) {

    }
}

export class EmbedAuthor {

    constructor(public name: string, public icon_url: string) {

    }
}

export class EmbedFooter {

    constructor(public text: string, public icon_url: string) {

    }
}

export class EmbedField {

    constructor(public name: string, public value: string, public inline: boolean) {

    }
}

export class EmbedThumbnail {

    constructor(public url: string) {

    }
}