import React from "react";

interface SearchInputProps {
    onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onChange }) => {
    return (
        <div className="p-1">
            <input
                type="search"
                className="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                onChange={onChange}
            />
            <span className="input-group-text border-0" id="search-addon">
        <i className="fas fa-search"></i>
      </span>
        </div>
    );
};

export default SearchInput;
