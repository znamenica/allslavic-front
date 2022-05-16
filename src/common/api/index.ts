import {library, LibraryItem, LibraryType} from "./library";

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
};

export default Api;
