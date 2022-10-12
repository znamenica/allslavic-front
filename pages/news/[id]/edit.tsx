import Api from "../../api";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useAppSelector} from "../../../hooks";
import {useState} from "react";
import {useRouter} from "next/router";
import Error from "next/error";
import NewsEditItem from "../../../components/news/NewsEditItem";

const NewsEditPage = ({ item }) => {
    const isLoggedIn = useAppSelector(state => state.me.loggedIn);
    const myId = useAppSelector(state => state.me.item?.id);
    const [name, setName] = useState(item?.title);
    const [description, setDescription] = useState(item?.abstract);
    const [category, setCategory] = useState("");
    const [cover, setCover] = useState(item?.cover_uri);
    const [content, setContent] = useState(item?.text);
    const router = useRouter();
    const onSubmit = () => {
        const token = localStorage.getItem("access_token");
        Api.news.edit(item.id, {
            title: name, text: content, author_id: myId, abstract: description, cover_uri: cover,
        }, token).then(() => {
            router.push('/news');
        });
    };

    if (!isLoggedIn) {
        return <Error statusCode={404} />
    }

    return <NewsEditItem
        name={name}
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

export const getStaticProps = async ({ locale, params }) => {
    const {item} = await Api.news.getById(params.id);
    return ({
        props: {
            item,
            ...await serverSideTranslations(locale, ['common']),
        },
    });
}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: true,
    }
};

export default NewsEditPage;
