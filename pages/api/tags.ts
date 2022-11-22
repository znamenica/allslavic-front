import Api from "./index";

export interface TagsItemsResponse {
    items: any[];
}

export interface TagItem {
    id: number;
    titles: TitleItem[];
    tag_kind: string;
}

export interface TitleItem {
    text: string;
}

const handler = (req, res) => {
    const pr = [];
    pr.push(Api.tags.getAllOuter(req.query));
    pr.push(Api.tags.getTitleList());
    return Promise.all(pr).then(response => {
        const tags = response[0]?.items;
        const titles = response[1]?.items?.filter(e => e.dictumable_type === "Tag");
        tags?.forEach(tag => {
           tag.titles = titles?.filter(e => e.dictumable_id === tag.id);
        });
        return res.status(200).json({ list: tags });
    }).catch(() => {
        return res.status(500).json({ list: [] });
    });
};

export default handler;
