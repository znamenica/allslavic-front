import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useState} from "react";
import Error from "next/error";
import {useAppSelector} from "../../hooks";
import Api from "../api";
import {useRouter} from "next/router";
import NewsEditItem from "../../components/news/NewsEditItem";

const Add = () => {
    const isLoggedIn = useAppSelector(state => state.me.loggedIn);
    const myId = useAppSelector(state => state.me.item?.id);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [cover, setCover] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter();
    const onSubmit = () => {
        const token = localStorage.getItem("access_token");
        Api.news.create({
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

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common']),
    },
});

export default Add;
