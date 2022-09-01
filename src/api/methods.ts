import client from './client';

const _get = (slug: string) => client.get(slug);
const _post = (slug: string, payload: any, value?: string) =>
  client.post(slug, payload, {
    headers: {
      Authorization: value,
    },
  });
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
const _delete = (slug: string, payload: any) => client.delete(slug, payload);

export default {_get, _post, _update, _delete, _put};
