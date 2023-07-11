export type TSelectThemeModalEditThemes = (
    e: React.MouseEvent<HTMLDivElement>,
    selectedElement: HTMLDivElement | null,
    setSelectedElement: (state: HTMLDivElement | null) => void,
    style: CSSModuleClasses
) => void;
export type TClearInput = (
    word: string,
    setWord: (state: string) => void,
    inputSearchThemes: React.MutableRefObject<HTMLInputElement | null>
) => void;