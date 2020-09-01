import React from "react";
import { Search as SearchIcon } from "react-feather";
import css from "./Search.module.scss";

interface SearchProps {
  search: string;
  onSearchChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
}

export const Search: React.FunctionComponent<SearchProps> = ({
  search,
  onSearchChanged,
  onSearchSubmit,
}: SearchProps) => {
  return (
    <form className={`container-fluid ${css.search}`} onSubmit={onSearchSubmit}>
      <div className="row h-100">
        <input
          className="col-9 col-sm-10"
          data-testid="registry-search"
          type="search"
          placeholder="Certificate store"
          onChange={onSearchChanged}
          value={search}
        />
        <button type="submit" className="col">
          <SearchIcon size={20} />
        </button>
      </div>
    </form>
  );
};
