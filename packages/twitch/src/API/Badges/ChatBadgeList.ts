import { Enumerable } from '@d-fischer/shared-utils';
import { ApiClient } from '../../ApiClient';
import { ChatBadgeSet, ChatBadgeSetData } from './ChatBadgeSet';

/** @private */
export type ChatBadgeListData = Record<string, ChatBadgeSetData>;

/**
 * A list of badge sets.
 */
export class ChatBadgeList {
	/** @private */
	@Enumerable(false) protected readonly _client: ApiClient;

	/** @private */
	constructor(private readonly _data: ChatBadgeListData, client: ApiClient) {
		this._client = client;
	}

	/**
	 * Names of all badge sets in the list.
	 */
	get badgeSetNames() {
		return Object.keys(this._data);
	}

	/**
	 * Gets a specific badge set by name.
	 *
	 * @param name The name of the badge set.
	 */
	getBadgeSet(name: string) {
		return new ChatBadgeSet(this._data[name], this._client);
	}

	/** @private */
	_merge(additionalData: ChatBadgeList | ChatBadgeListData) {
		if (additionalData instanceof ChatBadgeList) {
			additionalData = additionalData._data;
		}
		return new ChatBadgeList({ ...this._data, ...additionalData }, this._client);
	}
}
