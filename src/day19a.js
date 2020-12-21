import { data as data } from './day19.data'

console.time('Run')

const rulesAndMessages = data.split('\n\n')
const rules = new Map(rulesAndMessages[0].split('\n').map(rule => {
    const parts = rule.split(': ')
    const replacements = parts[1].split(' | ').map(phrase => {
        // const split = phrase.split(' ')
        // return (split.length === 2) ? `(${split[0]})(${split[1]})` : `(${split[0]})`
        // return phrase.split(' ')
        return phrase.replace(/\"/g, '')
    })
    return [parts[0], replacements]
}))
const messages = rulesAndMessages[1].split('\n')

const replaceEntry = (entry, match, replacement) => (
    entry.split(' ').map(
        item => item === match ? replacement : item
    ).join(' ')
)

const finalVocab = new Set()
// const vocab = new Set()

const substitute = (rules, entry) => {
    let substitutionCount = 0;
    const sequence = entry.split(' ').forEach((literal, index) => {
        const rule = rules.get(literal)
        if (rule) {
            rule.forEach(
                rewrite => {
                    const substitution = replaceEntry(entry, literal, rewrite)
                    // vocab.add(substitution)
                    workingVocab.push(substitution)
                    substitutionCount += 1
                }
            )
        }
    })
    // vocab.delete(entry)
    if (substitutionCount === 0) finalVocab.add(entry.replace(/\s/g, ''))
    return substitutionCount
}

const SAFE_DEPTH = 100000

// const generateOptions = (rules, seed = '0') => {
//     let substitutionCount = substitute(rules, seed)

//     let depth = 0
//     while (substitutionCount > 0) {
//         const snapshot = new Set(vocab)
//         snapshot.forEach(
//             entry => substitutionCount = substitute(rules, entry)
//         )
        
//         depth += 1
//         if (depth >= SAFE_DEPTH) break;
//         console.timeLog('Run')
//         console.log(vocab.size, finalVocab.size)
//     }

//     console.log(vocab)
//     console.log(finalVocab)
// }

const workingVocab = []

const generateOptionsDepthFirst = (rules, seed = '0') => {
    substitute(rules, seed)
    let depth = 0
    while (workingVocab.length > 0) {
        const entry = workingVocab.pop()
        const substitutionCount = substitute(rules, entry)
        
        if (depth >= SAFE_DEPTH) break;
        if (depth % 100000 === 0) {
            console.log(workingVocab.length, finalVocab.size, substitutionCount)
            console.timeLog('Run')
            console.assert()
        }
        depth += 1
    }

    console.log(workingVocab)
    console.log(finalVocab)
}

generateOptionsDepthFirst(rules)

console.timeEnd('Run')

// 64: "a"
// 34: "b"
// 0: 8 11

// (34)(34)(64)(34)(64)(64)(64)(34)(34)(34)(34)(64)
// (34)(64)(34)(34)(34)(64)(64)(34)(34)(64)(34)(64)

// 8 11
// for 8 (& 11)
// for each matching rule
// for each matching rewrite
// replace the literal with the rewrite
// push it to the set of substitutes

// 0: 8 11 -> 8 11
// 8: 42, 11: 42 31 -> 42 42 31
// 42: 42: 6 64 | 68 34, 31: 75 34 | 108 64 ->
//      6 64 6 64 74 34