import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useEffect, useState} from "react";
import Error from "next/error";
import {useAppDispatch, useAppSelector} from "../../hooks";
import Api from "../api";
import {useRouter} from "next/router";
import NewsEditItem from "../../components/news/NewsEditItem";
import {getTagsItems} from "../../store/reducers/tags";

const Add = () => {
    const isLoggedIn = useAppSelector(state => state.me.loggedIn);
    const myId = useAppSelector(state => state.me.item?.id);
    const tags = useAppSelector(state => state.tags.items);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [cover, setCover] = useState("");
    const [content, setContent] = useState("");
    const [tagIds, setTagIds] = useState([]);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const onSubmit = () => {
        const token = localStorage.getItem("access_token");
        const mainTag = tags.find(e => e.titles?.find(e => e.text === category));
        Api.news.create({
            novelty: {
                title: name,
                text: content,
                author_id: myId,
                abstract: description,
                cover_uri: cover,
                tags: mainTag ? [category] : [],
            },
        }, token).then(() => {
            router.push('/news');
        });
    };

    useEffect(() => {
        dispatch(getTagsItems());
    }, []);

    if (!isLoggedIn) {
        return <Error statusCode={404} />
    }

    return <NewsEditItem
        name={name}
        tagIds={tagIds}
        setTagIds={setTagIds}
        tags={tags}
        setName={setName}
        description={description}
        setDescription={setDescription}
        content={content}
        setContent={setContent}
        cover={cover}
        setCover={setCover}
        category={category}
        setCategory={setCategory}
        onSubmit={onSubmit}
    />;
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common']),
    },
});

export default Add;
