import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Error from "next/error";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Api from "../api";
import LibraryItemEdit from "../../components/library/LibraryItemEdit";
import {getTagsItems} from "../../store/reducers/tags";

const AddLibraryTextPage = () => {
    const isLoggedIn = useAppSelector(state => state.me.loggedIn);
    const myId = useAppSelector(state => state.me.item?.id);
    const tags = useAppSelector(state => state.tags.items);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [cover, setCover] = useState("http://");
    const [content, setContent] = useState("");
    const [tagIds, setTagIds] = useState([]);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const onSubmit = () => {
        const token = localStorage.getItem("access_token");
        const mainTag = tags.find(e => e.titles?.find(e => e.text === category));
        Api.texts.create({
            librum: {
                title: name,
                text: content,
                author_id: myId,
                abstract: description,
                cover_uri: cover,
                tags: mainTag ? [category] : [],
            }
        }, token).then(() => {
            router.push('/library');
        });
    };
    useEffect(() => {
        dispatch(getTagsItems());
    }, []);

    if (!isLoggedIn) {
        return <Error statusCode={404} />
    }

    return <LibraryItemEdit
        tagIds={tagIds}
        setTagIds={setTagIds}
        tags={tags}
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