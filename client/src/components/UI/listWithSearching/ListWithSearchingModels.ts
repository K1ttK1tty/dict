export interface IListWithSearching {
    inputSearchThemes: React.MutableRefObject<HTMLInputElement | null>;
    word: string;
    setWord: (state: string) => void;
    array: string[];
    setClearInput: () => void;
    onItemClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    dinamicClassName?: string;
}