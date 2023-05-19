import { DiscordClient } from "./discord/DiscordClient";
import { fetchStoreOffers } from "../store/StoreOfferController";
import { StoreOffer } from "../store/StoreOffer";
import { EmbedField, EmbedFooter, EmbedMessage, EmbedThumbnail } from "./discord/component/EmbedMessage";
import { Webhook } from "./discord/webhook/Webhook";
import moment from "moment";

export class StormOfferNotifier {

    private readonly matchers = [ "epic", "legendary", "mythic" ]
    private readonly iconUrl: string = "https://static.wikia.nocookie.net/fortnite/images/e/eb/V-Bucks_-_Icon_-_Fortnite.png/revision/latest?cb=20170806013747"

    constructor(public readonly client: DiscordClient,
                public readonly target: string | null) {

    }

    async notify(): Promise<void> {
        await fetchStoreOffers()
            .then(offers => offers.filter(offer => this.matchers.some(matcher => offer.rarity === matcher)))
            .then(offers => this.client.sendWebhook(this.target, this.getWebhook([ this.getMessageWithAlerts(offers) ])))
    }

    private getWebhook(components: Array<EmbedMessage>) {
        return new Webhook("stw-assistant", components, "<@&1109105344426283030>", this.iconUrl)
    }

    private getMessageWithAlerts(offers: Array<StoreOffer>): EmbedMessage {
        return new EmbedMessage(
            `Store offers for ${moment(Date.now()).format("DD/MM/YYYY")}`,
            15856929,
            offers.map(offer => new EmbedField(`${offer.item} [x${offer.limit}]`, offer.price.toFixed(2), false)),
            "A spicy dose of store items with pretty good rarity.",
            moment().toISOString(true),
            new EmbedThumbnail(this.iconUrl),
            new EmbedFooter("stw-assistant fetches data from Free The V-Bucks ❤", this.iconUrl))
    }
}