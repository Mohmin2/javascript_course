
//  CHallaenge

// Write a program that receives a list of variable names written in underscore_case
// and convert them to camelCase.


// test data
// underscore_case
// first_name
// Some_Variable
// calculate_AGE
// delayed_departure


function lowerCaseStr(str){
    let lowerCase = ""
    for(let s of str)
        lowerCase += s.toLowerCase()
    return lowerCase
}
function camelCase(data){

    let [str1,str2]= data.trim().split("_")

    str1 = lowerCaseStr(str1)
    str2 = str2[0].toUpperCase() + lowerCaseStr(str2.slice(1))

    const camelStr = str1 + str2 
    return camelStr 
}

console.log(camelCase(" calculate_AGE"))