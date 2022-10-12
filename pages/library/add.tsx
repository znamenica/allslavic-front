import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Error from "next/error";
import {useAppSelector} from "../../hooks";
import {useState} from "react";
import {useRouter} from "next/router";
import Api from "../api";
import LibraryItemEdit from "../../components/library/LibraryItemEdit";

const AddLibraryTextPage = () => {
    const isLoggedIn = useAppSelector(state => state.me.loggedIn);
    const myId = useAppSelector(state => state.me.item?.id);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [cover, setCover] = useState("http://");
    const [content, setContent] = useState("");
    const router = useRouter();
    const onSubmit = () => {
        const token = localStorage.getItem("access_token");
        Api.texts.create({
            title: name, text: content, author_id: myId, abstract: description, cover_uri: cover,
        }, token).then(() => {
            router.push('/library');
        });
    };

    if (!isLoggedIn) {
        return <Error statusCode={404} />
    }

    return <LibraryItemEdit
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

export default AddLibraryTextPage;