
import { TSelectThemeModalEditThemes, TClearInput } from './modelsModalEditThemes';
export const selectTheme: TSelectThemeModalEditThemes = (e, selectedElement, setSelectedElement, style) => {
    const divElement = e.target as HTMLDivElement;
    if (divElement === selectedElement) {
        divElement.classList.remove(style.selectedTheme);
        setSelectedElement(null);
        return;
    }
    if (selectedElement) {
        selectedElement.classList.remove(style.selectedTheme);
        divElement.classList.add(style.selectedTheme);
        setSelectedElement(divElement);
        return;
    }
    divElement.classList.add(style.selectedTheme);
    setSelectedElement(divElement);
};

export const clearInput: TClearInput = (word, setWord, inputSearchThemes) => {
    if (word) setWord('');
    if (inputSearchThemes.current) {
        inputSearchThemes.current.value = '';
    }
};
