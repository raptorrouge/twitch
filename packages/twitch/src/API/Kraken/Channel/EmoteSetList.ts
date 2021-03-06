import { Cacheable, Cached } from '@d-fischer/cache-decorators';

/** @private */
export interface Emote {
	code: string;
	id: number;
}

/** @private */
export type EmoteSetListData = Record<string, Emote[]>;

/**
 * A list of emotes, grouped into emote sets, that a user can use.
 */
@Cacheable
export class EmoteSetList {
	/** @private */
	constructor(private readonly _data: EmoteSetListData) {}

	/**
	 * Finds the emote ID for the given emote code.
	 *
	 * @param emoteCode The emote code to check for.
	 */
	@Cached(Infinity, true)
	findEmoteId(emoteCode: string) {
		for (const emoteSet of Object.values(this._data)) {
			for (const emote of emoteSet) {
				if (EmoteSetList._testEmoteCode(emote.code, emoteCode)) {
					return emote.id;
				}
			}
		}

		return undefined;
	}

	private static _testEmoteCode(code: string, text: string) {
		if (!code.includes('\\')) {
			return code === text;
		}

		const re = new RegExp(code);
		const match = re.exec(text);

		return match?.index === 0 && match[0].length === match.input.length;
	}
}
