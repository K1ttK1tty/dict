export const isNotEmpty = (variable) => {
    const ifNotEmpty = variable.split(' ').join('')
    if (ifNotEmpty) return true
    else return false
}