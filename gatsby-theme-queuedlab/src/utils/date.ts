import moment from './moment';
import { dateFormat } from '../constants';

export function formatDate(date: Date) {
  return moment(date).format(dateFormat);
}
