import type { ReactNode } from 'react';

import { useMemo, useState, useContext, createContext } from 'react';

// ----------------------------------------------------------------------

type SearchContextType = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
    const [searchQuery, setSearchQuery] = useState('');

    const memoizedValue = useMemo(
        () => ({
            searchQuery,
            setSearchQuery,
        }),
        [searchQuery]
    );

    return (
        <SearchContext.Provider value={memoizedValue}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}
