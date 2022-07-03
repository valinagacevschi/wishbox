import camelcaseKeys from 'camelcase-keys';

export const formatBoxItem = item => {
  if (!item) return null;
  const owner = item.owner;
  item.owner = { 
    ...owner, 
    id: parseInt(owner.id),
    image: owner.image.startsWith('/') ? `https://example.com/${owner.image}` : owner.image,
  };
  const product = item.product;
  let images = [product.image_url]
  if (product.image_url.startsWith('[')) {
    images = JSON.parse(product.image_url);
  }
  delete product.image_url;
  item.product = { ...product, images };
  return camelcaseKeys(item, { deep: true });
};

export default data => data.map(item => formatBoxItem(item));
