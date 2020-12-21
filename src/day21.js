import { data } from './day21.data'

const foods = data.split('\n').map(food => {
    const foodParts = food.match(/([a-z\s]+)\s\(contains\s([a-z\s,]+)\)/)
    return [foodParts[1].split(' '), foodParts[2].split(', ')]
})

const ingredients = new Map()
foods.forEach((food, index) => food[0].forEach(ingredient => {
    if (ingredients.has(ingredient)) {
        ingredients.set(ingredient, ingredients.get(ingredient).concat([index]))
    }
    else ingredients.set(ingredient, [index])
}))

const allergens = new Map()
foods.forEach((food, index) => food[1].forEach(allergen => {
    if (allergens.has(allergen)) {
        allergens.set(allergen, allergens.get(allergen).concat([index]))
    }
    else allergens.set(allergen, [index])
}))

const intersect = (array1, array2) => (
    array1.reduce((acc, item) => array2.includes(item) ? acc.concat([item]) : acc, [])
)

const subtractArrays = (array1, array2) => (
    array1.reduce((acc, item) => !array2.includes(item) ? acc.concat([item]) : acc, [])
)

const intersectMultiple = (arrays) => (
    arrays.slice(1).reduce((acc, array) => intersect(acc, array), arrays[0])
)

const getLengthOfLongestArrayInMap = (map) => {
    let length = 0
    map.forEach((value, key) => {
        if (value.length > length) {
            length = value.length 
        }
    })
    return length
}

const determineAllergens = (foods, ingredients, allergens) => {
    const allergenCandidates = new Map()

    allergens.forEach((foodsWithAllergen, allergen) => {
        const allergenInFoods = foodsWithAllergen.map(food => foods[food][0])

        const commonAllergens = intersectMultiple(allergenInFoods)
        allergenCandidates.set(allergen, commonAllergens)
    })

    const clearAllergens = []
    const mappedAllergens = new Map()
    while(clearAllergens.length < allergenCandidates.size) {
        for (let l = 1; l <= getLengthOfLongestArrayInMap(allergenCandidates); l += 1) {
            allergenCandidates.forEach((ingredients, allergen) => {
                if (ingredients.length > l) return
                
                const sortedAllergens = subtractArrays(ingredients, clearAllergens)
                if(sortedAllergens.length === 1) {
                    clearAllergens.push(sortedAllergens[0])
                    mappedAllergens.set(allergen, sortedAllergens[0])
                }
            })
        }
    }

    const translatedAllergens = Array.from(mappedAllergens).map(item => item[1])
    const cleanIngredients = subtractArrays(Array.from(ingredients).map(item => item[0]), translatedAllergens) 
    const appearances = cleanIngredients.reduce((acc, item) => acc + ingredients.get(item).length, 0)

    return {
        appearances: appearances,
        mappedAllergens: mappedAllergens,
    }
}

const cannonizeIngredients = (ingredients) => {
    return Array.from(ingredients)
        .sort((a, b) => {
            if (a < b) return -1
            if (a > b) return 1
            return 0
        })
        .map(item => item[1])
        .join(',')
}

const determinedAllergens = determineAllergens(foods, ingredients, allergens)
const cannonicalSupplies = cannonizeIngredients(determinedAllergens.mappedAllergens)

// console.log(determinedAllergens)
console.log(cannonicalSupplies)

// Part 1 = 1977
// Part 2 = 
