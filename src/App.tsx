import { useReducer } from "react";
import { useGetHotListingQuery } from "./services/api";

function Listing() {
    const { data, isError, isLoading } = useGetHotListingQuery();

    return (
        <div>
            {isError ? (
                <>Oh no, there was an error</>
            ) : isLoading ? (
                <>Loading...</>
            ) : data ? (
                <>
                    <h3>{JSON.stringify(data.posts)}</h3>
                </>
            ) : null}
        </div>
    );
}

export default function App() {
    const [isListingMounted, toggleIsListingMounted] = useReducer(
        (state) => !state,
        true
    );
    return (
        <div>
            <h1>Data fetching/caching example - RTK Query</h1>
            <button onClick={toggleIsListingMounted}>Toggle listing</button>
            {isListingMounted && <Listing />}
        </div>
    );
}
