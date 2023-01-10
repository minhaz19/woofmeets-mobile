import client from './client';

const _get = (slug: string, payload?: any, cancelToken?: any) =>
  client.get(slug, payload, cancelToken);
const _post = (slug: string, payload: any, value?: string) => {
  return client.post(slug, payload, {
    headers: {
      Authorization: value,
    },
  });
};
const _performent_post = (
  slug: string,
  payload: any,
  source?: any,
  value?: string,
) => {
  return client.post(slug, payload, {
    cancelToken: source.token,
    headers: {
      Authorization: value,
    },
  });
};
const _idempt_post = (slug: string, payload: any, value?: string) => {
  return client.post(slug, payload, {
    headers: {
      'Idempontency-Key': value,
    },
  });
};
const _update = (slug: string, payload?: any, value?: string) =>
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

export default {
  _get,
  _post,
  _performent_post,
  _update,
  _put,
  _delete,
  _idempt_post,
};
