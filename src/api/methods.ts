import client from './client';

const _get = (slug: string, payload?: any) => client.get(slug, payload);
const _post = (slug: string, payload: any, value?: string) => {
  return client.post(slug, payload, {
    headers: {
      Authorization: value,
    },
  });
};
const _update = (slug: string, payload: any, value?: string) =>
  client.patch(slug, payload, {
    headers: {
      Authorization: value,
    },
  });
const _put = (slug: string, payload: any, value?: string) =>
  client.put(slug, payload, {
    headers: {
      Authorization: value,
    },
  });
const _delete = (slug: string) => client.delete(slug);

export default {_get, _post, _update, _put, _delete};
