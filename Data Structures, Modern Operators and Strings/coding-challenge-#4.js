
//  CHallaenge

// Write a program that receives a list of variable names written in underscore_case
// and convert them to camelCase.


// test data
// underscore_case
// first_name
// Some_Variable
// calculate_AGE
// delayed_departure



function camelCase(data){

    let [str1,str2]= data.trim().split("_")

    str1 = str1.toLowerCase()
    str2 = str2[0].toUpperCase() + str2.slice(1).toLowerCase()

    const camelStr = str1 + str2 
    return camelStr 
}

console.log(camelCase(" calculate_AGE"))