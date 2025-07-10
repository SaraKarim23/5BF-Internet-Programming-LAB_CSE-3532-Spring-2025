import { Client } from '../client';
import type { Models } from '../models';
export declare class Messaging {
    client: Client;
    constructor(client: Client);
    /**
     * Create a new subscriber.
     *
     * @param {string} topicId
     * @param {string} subscriberId
     * @param {string} targetId
     * @throws {AppwriteException}
     * @returns {Promise<Models.Subscriber>}
     */
    createSubscriber(topicId: string, subscriberId: string, targetId: string): Promise<Models.Subscriber>;
    /**
     * Delete a subscriber by its unique ID.
     *
     * @param {string} topicId
     * @param {string} subscriberId
     * @throws {AppwriteException}
     * @returns {Promise<{}>}
     */
    deleteSubscriber(topicId: string, subscriberId: string): Promise<{}>;
}
