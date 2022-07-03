import Config from 'react-native-config';
import camelcaseKeys from 'camelcase-keys';

const baseUrl = __DEV__ && false ? Config.devBaseUrl : Config.baseUrl;

const fixUri = image => {
  if (!image) return `${baseUrl}/assets/nophoto.png`;
  if (image.startsWith('http')) return image;
  if (image.startsWith('//')) return `https:${image}`;
  if (image.startsWith('/')) return `${baseUrl}${image}`;
};

export const authUser = (user: Object, authType: string) => ({
  id: user.id,
  name: user.name,
  link: user.link,
  email: user.email,
  image: user.picture, //authType === 'facebook' ? `https://graph.facebook.com/${user.id}/picture` : user.picture,
  picture: user.picture,
  provider: authType,
  firstName: user.given_name || user.first_name,
  lastName: user.family_name || user.last_name,
  gender: user.gender
});

export const formatInvite = item => {
  if (!item) return null;
  item.image = fixUri(item.image);
  item.name = item.email;
  item.type = 'invite';
  return camelcaseKeys(item);
};
export const formatInvites = data => data.map(item => formatInvite(item));

export const formatUser = item => {
  if (!item) return null;
  item.image = fixUri(item.image);
  item.type = 'user';
  return camelcaseKeys(item);
};

export const formatMember = item => {
  if (!item) return null;
  item.image = fixUri(item.image);
  return camelcaseKeys(item);
};
export const formatMembers = data => data.map(item => formatMember(item));

export default data => data.map(item => formatUser(item));
