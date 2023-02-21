export const _removeTheme = (setSelectOptions, selectOptions, chooseTheme, setReplaceOptionName, setChooseTheme) => {
    setSelectOptions(selectOptions.filter(theme => theme != chooseTheme));
    setReplaceOptionName('Choose a theme');
    setChooseTheme('');
}