import moment from "moment-timezone";
import config from "../../data/SiteConfig";

moment.tz.setDefault(config.siteTimezone);

export default moment;
