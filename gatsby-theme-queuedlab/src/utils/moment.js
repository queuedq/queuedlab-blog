import moment from "moment-timezone";
import config from "../../data/site-config";

moment.tz.setDefault(config.siteTimezone);

export default moment;
