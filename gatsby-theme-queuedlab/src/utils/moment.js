import moment from "moment-timezone";
import config from "../../data/site-config";

// set timezone
moment.tz.setDefault(config.siteTimezone);

export default moment;
