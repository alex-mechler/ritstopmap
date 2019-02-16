import moment from 'moment';
import config from '../config';

export default class CommunityDayManager {
    constructor() {
        this._startTime = moment.unix(config.community_day_start);
        this._endTime = moment.unix(config.community_day_end);
    }

    isCommunityDayHours() {
        const now = moment();

        return now.isBetween(this._startTime, this._endTime, null, '[)');
    }

    get endTime() {
        return this._endTime;
    }
}