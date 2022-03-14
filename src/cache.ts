import fetch from "node-fetch";
import NodeCache from "node-cache";

class TimelineCache{
    myCache = new NodeCache({stdTTL: 10});
    constructor(){}
}