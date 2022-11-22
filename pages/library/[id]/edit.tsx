import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Error from "next/error";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Api from "../../api";
import LibraryItemEdit from "../../../components/library/LibraryItemEdit";
import {getTagsItems} from "../../../store/reducers/tags";

const EditLibraryTextPage = ({ item }) => {
    const isLoggedIn = useAppSelector(state => state.me.loggedIn);
    const tags = useAppSelector(state => state.tags.items);
    const myId = useAppSelector(state => state.me.item?.id);
    const [name, setName] = useState(item?.title);
    const [description, setDescription] = useState(item?.abstract);
    const [category, setCategory] = useState("");
    const [cover, setCover] = useState(item?.cover_uri);
    const [content, setContent] = useState(item?.text);
    const [tagIds, setTagIds] = useState([]);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const onSubmit = () => {
        const token = localStorage.getItem("access_token");
        const mainTag = tags.find(e => e.titles?.find(e => e.text === category));
        Api.texts.edit(item.id, {
            librum: {
                title: name,
                text: content,
                author_id: myId,
                abstract: description,
                cover_uri: cover,
                tags: mainTag ? [category] : [],
            },
        }, token).then(() => {
            router.push('/library');
        });
    };

    useEffect(() => {
        dispatch(getTagsItems());
    }, []);

    useEffect(() => {
        if (item?.tag_ids) {
            const tag = tags.find(e => item?.tag_ids.includes(e.id));
            if (tag) {
                setCategory(tag.titles[0]?.text);
            }
        }
    }, [tags, item?.tag_ids]);

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

export const getStaticProps = async ({ locale, params }) => {
    const {item} = await Api.texts.getById(params.id);
    return {
        props: {
            item,
            ...await serverSideTranslations(locale, ['common']),
        },
    };
};

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: true,
    }
};

export default EditLibraryTextPage;