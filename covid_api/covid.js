document.addEventListener('DOMContentLoaded', function () {

    GlobalData()
    const countries = {type:"country"},abbrevations = {type:"ab"},continents = {type:"continent"}

    // storing it in objects to minimize pi calls
    data(countries,abbrevations,continents)
    let start_time = new Date().getTime()
    document.getElementsByTagName('input')[0].addEventListener('input',function(e){


            let str = this.value.toLowerCase(),prev_str = null
            let final_time = new Date().getTime()
            
            if(str.match(/^[A-Za-z0-9]+$/) && (str !== prev_str) && ((final_time - start_time) > 1300)){
                matching_results.call({countries,abbrevations,continents,str})
                prev_str = str
                start_time = final_time
            }

    })
})


async function GlobalData() {

    try {
        const data = await fetch("https://covid-api.mmediagroup.fr/v1/cases")

        if (!data.ok) throw new Error("something went wrong reload page")

        const response = await data.json()

        const cases = response['Global']['All']

        document.getElementById('Total-cases').innerText = cases['confirmed']
        document.getElementById('Recovered-cases').innerText = cases['recovered']
        document.getElementById('Active-cases').innerText = cases['confirmed'] - (cases['recovered'] + cases['deaths'])

    } catch (err) {

        console.error(`${err}`)
    }
}

// made this function to minimize api calls
async function data(countries,abbrevations,continents) {

    try {
        const data = await fetch("https://covid-api.mmediagroup.fr/v1/cases")

        if (!data.ok) throw new Error("something went wrong reload page")

        const countries_data = await data.json()
    
 
        for(const cntr in countries_data){
            
            // has some undefined values for country ,abbreviation,continent
            countries_data[cntr]["All"]["country"]
            const country     = countries_data[cntr]["All"]["country"] ?? cntr.toLowerCase()
            countries[country.toLowerCase()] = true

            // otherwise many contries can have same "abbreviations"
            if(!countries_data[cntr]["All"]['abbreviation'])continue

            const abbrevation = countries_data[cntr]["All"]['abbreviation']
            abbrevations[abbrevation.toLowerCase()] = true

            const continent = countries_data[cntr]["All"]['continent'] ?? "asia"
            continents[continent.toLowerCase()] = true
        }

    } catch (err) {

        console.error(`${err}`)
    }
}


// adds data to html

function showData(type,place,active,confirmed,recovered) {

    const list = document.getElementsByClassName("list-group")[0]
    const dataElements = document.getElementsByClassName("data-elements")[0]
    const li = document.createElement('li')
    li.className = "list-group-item"
    li.innerText = `${type} ${place}  ,Active cases ${active},Confirmed cases ${confirmed},recovered cases ${recovered}`
    dataElements.appendChild(li)

    list.style.display = "block"
    const input = document.getElementsByTagName('input')[0]
    input.nextElementSibling.style.display = "none"
}


// ("what is your") => ("What Is Your")
function first_word_Capital(word){

    return word.split(" ").map(wr => (wr[0].toUpperCase() + wr.slice(1))).join(" ")
    
}
// calling the payload here
async function addData(matches,type) {
    const list = document.getElementsByClassName("list-group")[0]
    
    // clear previious search results
    if(list.childElementCount > 0){
        console.log(list.children[0])
        list.removeChild(list.children[0])
    }
    const dataElements =  document.createElement('div')

    dataElements.className = "data-elements"
    list.appendChild(dataElements)

    if (type === "continent"){
        console.log("continent",matches)
        let place = matches[0]

        // other wise gives wrong results
        place = first_word_Capital(place)
        const data = await fetch(`https://covid-api.mmediagroup.fr/v1/cases?${type}=${place}`)
        const response = await data.json()

        let confirmed = 0,recovered = 0,deaths = 0

        for (const country in response) {
            confirmed += response[country]["All"]["confirmed"]
            deaths += response[country]["All"]["deaths"]
            recovered += response[country]["All"]["recovered"]
        }

        const active = confirmed - (deaths + recovered)

        showData(type,place,active,confirmed,recovered)
    }
    else{
        for(let place of matches){
            // other wise gives wrong results
            place = first_word_Capital(place)
            const data = await fetch(`https://covid-api.mmediagroup.fr/v1/cases?${type}=${place}`)
            const response = await data.json()
            console.log(place,type,response['All'])
            const confirmed = response["All"]["confirmed"]
            const deaths = response["All"]["deaths"]
            const recovered = response["All"]["recovered"]

            const active = confirmed - (deaths + recovered)
            showData(type,place,active,confirmed,recovered)
        }
    }
}



function matching_results(){

    if(this.abbrevations[this.str]){

        addData([this.str],this.abbrevations['type'])
        return 
    }
    else if(this.continents[this.str]){
        addData([this.str],this.continents['type'])
        return
    }

    let matches = []

    for(let country in  this.countries){

        if(country.includes(this.str))
            matches.push(country)
    }
    addData(matches,this.countries['type'])
}