document.addEventListener('DOMContentLoaded', function () {

    GlobalData()

    document.getElementsByTagName('button')[0].addEventListener('click', function () {

        const data = checkData()

        if (data) {
            particularData(data[0], data[1])
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


function checkData() {

    const selectBox = document.getElementsByTagName('Select')[0]
    const number = Number(selectBox.value)
    if (!number) {
        selectBox.nextElementSibling.style.display = "block"
        return false
    }

    let input = document.getElementsByTagName('input')[0].value
    if (input.length === 0)
        return false

    selectBox.nextElementSibling.style.display = "none"

    const type = selectBox.options[number].innerText.toLowerCase()
    input = input[0].toUpperCase() + input.slice(1)
    return [type, input]
}

async function particularData(type, place) {

    try {

        console.log(`https://covid-api.mmediagroup.fr/v1/cases?${type}=${place}`)
        const data = await fetch(`https://covid-api.mmediagroup.fr/v1/cases?${type}=${place}`)

        const response = await data.json()

        if (type === "continent") {

            if (Object.keys(response).length === 0)
                throw new Error("couldn't find the place")

            let confirmed = 0,
                recovered = 0,
                deaths = 0
            for (const country in response) {

                confirmed += response[country]["All"]["confirmed"]
                deaths += response[country]["All"]["deaths"]
                recovered += response[country]["All"]["recovered"]
            }

            const active = confirmed - (deaths + recovered)
            showData([confirmed, recovered, active])

        } else {
            if (!response['All']['confirmed'])
                throw new Error("couldn't find the place")

            const confirmed = response["All"]["confirmed"]
            deaths = response["All"]["deaths"]
            recovered = response["All"]["recovered"]

            const active = confirmed - (deaths + recovered)
            showData([confirmed, recovered, active])
        }

    } catch (err) {

        const input = document.getElementsByTagName('input')[0]
        input.nextElementSibling.style.display = "block"

        const list = document.getElementsByClassName("list-group")[0]
        list.style.display = "none"
    }
}


function showData(data) {

    const list = document.getElementsByClassName("list-group")[0]
    console.log(data,list)
    for (let i = 0; i < list.childElementCount; i++) {
        console.log( list[i])
        list.children[i].children[0].innerText = data[i]
    }

    list.style.display = "block"

    const input = document.getElementsByTagName('input')[0]
    input.nextElementSibling.style.display = "none"
}