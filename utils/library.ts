import {LibraryTag} from "../pages/api/library";

export const libraryCategoryTagList = () => {
    return ["-", ...Object.values(LibraryTag)];
};

export const isLibraryTag = (e) => {
    return Object.values(LibraryTag).includes(e.titles[0]?.text);
}