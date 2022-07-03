import camelcaseKeys from 'camelcase-keys';

export const formatNote = item => {
  if (!item) return null;
  delete item.app;
  delete item.created_at;
  delete item.updated_at;
  delete item.device_id;
  delete item.image_url;
  delete item.name;
  delete item.obj_id;
  delete item.original_id;
  return camelcaseKeys(item, { deep: true });
};

export default data => data.map(item => formatNote(item));
