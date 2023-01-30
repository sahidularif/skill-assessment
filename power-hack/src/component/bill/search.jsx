
const Search = ({ setSearch }) => {
    return (
        <input
            type="text"
            class="form-control"
            placeholder="Search"
            onChange={({ currentTarget: input }) => setSearch(input.value)}
        />
    );
};

export default Search;
