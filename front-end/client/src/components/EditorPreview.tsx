import LoadingSpinner from "./LoadingSpinner";

const EditorPreview = (props: {value: string}) => {
    return (
        <>
            {!props.value ? <LoadingSpinner></LoadingSpinner> :
                    <h4 className="mb-4">{props.value}</h4>
            }
        </>
    )
}

export default EditorPreview