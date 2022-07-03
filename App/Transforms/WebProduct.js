// import camelcaseKeys from 'camelcase-keys';

export const formatProduct = item => {
  if (!item) return null;

  const images = [item.imageUrl];
  delete item.imageUrl;
  delete item[0];
  delete item[1];
  delete item.height;
  delete item.width;
  delete item.thumbnailHeight;
  delete item.thumbnailWidth;
  delete item.thumbnailUrl;
  delete item.hostPageDisplayUrl;

  const description = item.name;
  const currency = 'LEI';
  const price = null;
  // const store = [];

  return { ...item, images, description, currency, price };
};

export default data => data.map(item => formatProduct(item));
