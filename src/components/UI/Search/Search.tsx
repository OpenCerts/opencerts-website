import React from "react";
import { Search as SearchIcon } from "react-feather";

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
    <form className="max-w-full lg:max-w-xs ml-auto" onSubmit={onSearchSubmit}>
      <div className="flex">
        <input
          className="flex-grow border border-navy py-2 px-4 rounded-tl-full rounded-bl-full focus:outline-none focus:shadow-outline"
          data-testid="registry-search"
          type="search"
          placeholder="Search certificate store address"
          onChange={onSearchChanged}
          value={search}
        />
        <button
          type="submit"
          className="w-12 bg-navy-300 text-white rounded-tr-full rounded-br-full focus:outline-none focus:shadow-outline"
        >
          <SearchIcon className="mx-auto" size={20} />
        </button>
      </div>
    </form>
  );
};
