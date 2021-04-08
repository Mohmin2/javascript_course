const gameEvents = new Map([
    [17, '⚽ GOAL'],
    [36, '🔁 Substitution'],
    [47, '⚽ GOAL'],
    [61, '🔁 Substitution'],
    [64, '🔶 Yellow card'],
    [69, '🔴 Red card'],
    [70, '🔁 Substitution'],
    [72, '🔁 Substitution'],
    [76, '⚽ GOAL'],
    [80, '⚽ GOAL'],
    [92, '🔶 Yellow card'],
    ]);


// TASK 1

    // 1. Create an array 'events' of the different game events that happened (no
    //     duplicates)

const events = new Set([... gameEvents.keys()])


// Task 2

// 2. After the game has finished, is was found that the yellow card from minute 64
// was unfair. So remove this event from the game events log.

gameEvents.delete(64)


// Task 3
// 3. Compute and log the following string to the console: "An event happened, on
// average, every 9 minutes" (keep in mind that a game has 90 minutes)

let average = 0
for(let event of gameEvents.keys()){
    average += event
   
}
console.log(`An event happened, on average, every ${average/90} minutes`)

// TAsk 4
// 4. Loop over 'gameEvents' and log each element to the console, marking
// whether it's in the first half or second half (after 45 min) of the game, like this:
// [FIRST HALF] 17: ⚽ GOAL

for(let [time,event] of gameEvents){
    if (time <= 45)
        console.log(`[FIRST HAlf] ${time}: ${event}`)
    else    
        console.log(`[Second HAlf] ${time}: ${event}`)
}