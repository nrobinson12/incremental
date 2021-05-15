import './style.css'

var state = {
    wood: 0,
    baseWoodPerClick: 1,
    axesOwned: 0,
}

// -------- GENERAL -------- //

// get current resource value
// return -1 on error
const getResource = (resource) => {
    if (!state.hasOwnProperty(resource)) {
        console.error('unknown resource')
        return -1
    }
    return state[resource]
}

// add amount to resource
// return -1 on error
const addToResource = (resource, amount) => {
    if (getResource(resource) == -1) {
        return -1
    }
    state[resource] += amount
}

// subtract resource by amount
// return -1 on error
const payResource = (resource, amount) => {
    if (getResource(resource) == -1) {
        return -1
    }
    if (state[resource] < amount) {
        console.error('not enough resources to pay');
        return -1
    }
    state[resource] -= amount
}

// -------- WOOD -------- //

const getWoodRate = () => {
    var rate = state.baseWoodPerClick
    rate += state.axesOwned * 1
    return rate
}

const updateWoodDisplay = () => {
    document.getElementById('wood').innerHTML = getResource('wood')
}

// Chop Wood Button
document.getElementById('chop-wood').addEventListener('click', () => {
    addToResource('wood', getWoodRate())
    updateWoodDisplay()
})

// Buy Axe Button
const axePrice = 20
const buyAxeElem = document.getElementById('buy-axe')
buyAxeElem.innerHTML = axePrice + ' wood'
buyAxeElem.addEventListener('click', () => {
    payResource('wood', axePrice)
    state.axesOwned += 1
})

// function runs every frame
const tick = () => {
    
    // update item storage
    updateWoodDisplay()

    // update shop items
    if (state.wood < axePrice) {
        buyAxeElem.disabled = true
    } else if (state.wood >= axePrice) {
        buyAxeElem.disabled = false
    }

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()
