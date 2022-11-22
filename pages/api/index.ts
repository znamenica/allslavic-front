import {library, LibraryItem, LibraryType} from "./library";
import {NewsItemResponse, NewsItemsResponse} from "./news";
import {TextItemResponse, TextItemsResponse} from "./texts";
import {TagsItemsResponse} from "./tags";

const Api = {
  library: {
    getAll(params: { type: LibraryType[] }): Promise<LibraryItem[]> {
        const type = params?.type;
        return Promise.resolve(type.length ? library.filter(e => type?.includes(e.type)) : library);
    },
    getById: (id: number): Promise<LibraryItem|null> => {
        const elem = library.find(e => e.id === id);
        return Promise.resolve(elem ? elem : null);
    },
  },
  auth: {
    login: (username, password) => {
        return fetch(`${process.env.NEXT_PUBLIC_API}/users/sign_in.json`, {
            method: "POST",
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({ user: { email: username, password } }),
        })
    },
      logout: (token) => {
          return fetch(`${process.env.NEXT_PUBLIC_API}/users/sign_out.json`, {
              method: "POST",
              headers: new Headers({ 'X-Auth-Token': token }),
          })
      },
  },
  me: {
      getMe(token) {
          return fetch(`${process.env.NEXT_PUBLIC_API}/me.json`, {
              headers: new Headers({ 'X-Auth-Token': token }),
          }).then(res => res.json());
      },
      updateMe(id, body, token) {
          return fetch(`${process.env.NEXT_PUBLIC_API}/me.json`, {
              method: 'PUT',
              headers: new Headers({
                  'Content-Type': 'application/json',
                  'X-Auth-Token': token,
              }),
              body: JSON.stringify(body),
          });
      },
  },
  tags: {
      getAll(params): Promise<TagsItemsResponse> {
          const searchParams = new URLSearchParams();
          if (params.page) {
              searchParams.set("p", params.page);
          }
          if (params.count) {
              searchParams.set("per", params.count);
          }
          searchParams.set("sort", "created_at:desc");
          return fetch(`/api/tags?${searchParams.toString()}`)
              .then(res => {
                  return res.json()
              })
              .then(data => ({
                  items: data.list,
              }));
      },
      getTitleList(): Promise<any> {
          const searchParams = new URLSearchParams({
              dictumable_type: 'Tag',
          });
          return fetch(`${process.env.NEXT_PUBLIC_API}/s.json?${searchParams.toString()}`)
              .then(res => {
                  return res.json()
              })
              .then(data => ({
                  items: data.list,
              }));
      },
      getAllOuter(params): Promise<TagsItemsResponse> {
          const searchParams = new URLSearchParams(params);
          return fetch(`${process.env.NEXT_PUBLIC_API}/t.json?${searchParams.toString()}`)
              .then(res => {
                  return res.json()
              })
              .then(data => ({
                  items: data.list,
              }));
      },
      create(tag, token) {
          return fetch(`${process.env.NEXT_PUBLIC_API}/t.json`, {
              method: "POST",
              headers: new Headers({
                  'Content-Type': 'application/json',
                  'X-Auth-Token': token,
              }),
              body: JSON.stringify(tag),
          });
      },
      deleteById(id: number, token) {
          return fetch(`${process.env.NEXT_PUBLIC_API}/t/${id}.json`, {
              method: 'DELETE',
              headers: new Headers({
                  'X-Auth-Token': token,
              }),
          });
      },
  },
  news: {
    getAll(params: any, token: string): Promise<NewsItemsResponse> {
        const searchParams = new URLSearchParams();
        if (params.page) {
            searchParams.append("p", params.page);
        }
        if (params.count) {
            searchParams.append("per", params.count);
        }
        if (params.tagIds?.length > 0) {
            params.tagIds.forEach((tag) => {
                searchParams.append(`by_tags[]`, token ? tag : `${tag},!interslavic-circle`);
            });
        } else if (!token) {
            searchParams.append(`by_tags[]`, `!interslavic-circle`);
        }
        searchParams.set("sort", "created_at:desc");
        return fetch(`${process.env.NEXT_PUBLIC_API}/news.json?${searchParams.toString()}`)
            .then(res => {
                if (res.status === 403) {
                    return {
                        items: [],
                        needAuth: true,
                    };
                }
                return res.json()
            })
            .then(data => ({
                items: data.list,
                needAuth: false,
            }));
    },
    deleteById(id: number, token) {
        return fetch(`${process.env.NEXT_PUBLIC_API}/news/${id}.json`, {
            method: 'DELETE',
            headers: new Headers({
                'X-Auth-Token': token,
            }),
        });
    },
    getById(id: number): Promise<NewsItemResponse> {
        return fetch(`${process.env.NEXT_PUBLIC_API}/news/${id}.json`)
            .then(res => {
                if (res.status === 403) {
                    return {
                        item: null,
                        needAuth: true,
                    };
                }
                return res.json()
            })
            .then(data => ({
                item: data,
                needAuth: false,
            }));
    },
    create(news, token) {
        return fetch(`${process.env.NEXT_PUBLIC_API}/news.json`, {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json',
                'X-Auth-Token': token,
            }),
            body: JSON.stringify(news),
        });
    },
    edit(id, news, token) {
        return fetch(`${process.env.NEXT_PUBLIC_API}/news/${id}.json`, {
            method: "PATCH",
            headers: new Headers({
                'Content-Type': 'application/json',
                'X-Auth-Token': token,
            }),
            body: JSON.stringify(news),
        });
    }
  },
    texts: {
        getAll(params: any): Promise<TextItemsResponse> {
            const searchParams = new URLSearchParams();
            if (params.page) {
                searchParams.set("p", params.page);
            }
            if (params.count) {
                searchParams.set("per", params.count);
            }
            if (params.tagIds?.length > 0) {
                params.tagIds.forEach((tag) => {
                    searchParams.append(`by_tags[]`, tag);
                });
            }
            searchParams.set("sort", "created_at:desc");
            return fetch(`${process.env.NEXT_PUBLIC_API}/library.json?${searchParams.toString()}`)
                .then(res => {
                    if (res.status === 403) {
                        return {
                            items: [],
                            needAuth: true,
                        };
                    }
                    return res.json()
                })
                .then(data => ({
                    items: data.list,
                    needAuth: false,
                }));
        },
        deleteById(id: number, token) {
            return fetch(`${process.env.NEXT_PUBLIC_API}/library/${id}.json`, {
                method: 'DELETE',
                headers: new Headers({
                    'X-Auth-Token': token,
                }),
            });
        },
        getById(id: number): Promise<TextItemResponse> {
            return fetch(`${process.env.NEXT_PUBLIC_API}/library/${id}.json`)
                .then(res => {
                    if (res.status === 403) {
                        return {
                            item: null,
                            needAuth: true,
                        };
                    }
                    return res.json()
                })
                .then(data => ({
                    item: data,
                    needAuth: false,
                }));
        },
        create(news, token) {
            return fetch(`${process.env.NEXT_PUBLIC_API}/library.json`, {
                method: "POST",
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'X-Auth-Token': token,
                }),
                body: JSON.stringify(news),
            });
        },
        edit(id, item, token) {
            return fetch(`${process.env.NEXT_PUBLIC_API}/library/${id}.json`, {
                method: "PATCH",
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'X-Auth-Token': token,
                }),
                body: JSON.stringify(item),
            });
        }
    }
};

export default Api;
