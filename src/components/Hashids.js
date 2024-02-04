// src/utils/hashidsUtils.js

import Hashids from "hashids";


export function customHashids(id, uniqueKey, length) {
    const hashids = new Hashids(uniqueKey, length);
    const shortId = hashids.encode(id);
    return shortId;
}

export function customHashidsGet(shortId, uniqueKey, length) {
    const hashids = new Hashids(uniqueKey, length);
    const userId = hashids.decode(shortId);
    return userId[0];
}
