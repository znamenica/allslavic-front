import dynamic from "next/dynamic";

const TextEditorLoader = dynamic(
    () => import("./TextEditor"),
    { ssr: false }
);

export default TextEditorLoader;
