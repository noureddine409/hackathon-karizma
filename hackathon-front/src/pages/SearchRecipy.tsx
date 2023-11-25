import {useEffect, useState} from "react";
import {DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, DEFAULT_SEARCH_KEYWORD, DEFAULT_TOTAL_PAGES} from "../common/constants";
import Pagination from "../components/Pagination";
import SearchInput from "../components/SearchInput";
import RecipyList from "../components/RecipyList";
import {Recipy, SearchParameter} from "../model/recipies.model";


const SearchRecipy = () => {
    // states
    const [items, setItems] = useState<Recipy[]>([])
    const [searchParameter, setSearchParameter] = useState<SearchParameter>(
        {
            keyword: DEFAULT_SEARCH_KEYWORD,
            page: DEFAULT_PAGE_NUMBER,
            size: DEFAULT_PAGE_SIZE,
            totalPages: DEFAULT_TOTAL_PAGES
        }
    );

    const SearchHandleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const keyword = event.currentTarget.value;
        setSearchParameter({
            ...searchParameter,
            keyword: keyword,
        });
    };



    const nextPage = () => {

        if (searchParameter.page < searchParameter.totalPages) {
            setSearchParameter({
                ...searchParameter,
                page: searchParameter.page + 1,
            });
        }
    }
    const previousPage = () => {
        if (searchParameter.page > 1) {
            setSearchParameter({
                ...searchParameter,
                page: searchParameter.page - 1,
            });
        }
    }
    const changeCurrentPage = (pageNumber: number) => {
        setSearchParameter({
            ...searchParameter,
            page: pageNumber,
        });
    }

    return (
        <main id="main" className="main">
            <div className="container px-3">
                <div className="row">
                    <div className="col-sm">
                        <SearchInput onChange={SearchHandleChange}/>
                    </div>
                </div>
            </div>
            <RecipyList items={items} />
            <Pagination
                currentPage={searchParameter.page}
                totalPages={searchParameter.totalPages}
                previousPage={previousPage}
                nextPage={nextPage}
                changeCurrentPage={changeCurrentPage}
            />

        </main>
    )

}

export default SearchRecipy;
