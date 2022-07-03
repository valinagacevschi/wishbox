import camelcaseKeys from 'camelcase-keys';
import formatBoxItems from './Feed';

export const formatBox = item => {
  if (!item) return null;
  item.box_items = formatBoxItems(item.box_items);
  return camelcaseKeys(item, { deep: true });
};

export default (data, me) => data
  .filter(item => (item.private ? item.members.includes(me) : true))
  .map(item => formatBox(item));
