// Columns: B=1-15, I=16-30, N=31-45, G=46-60, O=61-75
const COLUMNS = ['B', 'I', 'N', 'G', 'O']
const RANGES = { B: [1, 15], I: [16, 30], N: [31, 45], G: [46, 60], O: [61, 75] }

export function getColumnForNumber(num) {
    for (const col of COLUMNS) {
        const [min, max] = RANGES[col]
        if (num >= min && num <= max) return col
    }
    return ''
}

export function generateAllNumbers() {
    const nums = []
    for (let i = 1; i <= 75; i++) nums.push(i)
    return nums
}

export function shuffle(arr) {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

export const COLUMNS_LIST = COLUMNS
export const RANGES_MAP = RANGES
