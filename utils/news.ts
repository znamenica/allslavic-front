import {NewsTag} from "../pages/api/news";

export const newsCategoryTagList = () => {
    return ["-", ...Object.values(NewsTag)];
};

export const isNewsTag = (e) => {
    return Object.values(NewsTag).includes(e.titles[0]?.text);
};
