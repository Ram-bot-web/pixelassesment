import ClipLoader from "react-spinners/ClipLoader";

export const PageLoader = ({ loading }) => {
    return (
        <>{loading &&
            <div className="loader-div">
                <ClipLoader
                    loading={loading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        }</>
    )
}