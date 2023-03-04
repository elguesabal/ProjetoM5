if ('webkitSpeechRecognition' in window) {
    let recognition = new webkitSpeechRecognition()

    recognition.continuous = true
    recognition.interimResults = true

    let comandoVoz = document.getElementById('comandoVoz')
    let campoPesquisa = document.getElementById('campoPesquisa')

    comandoVoz.addEventListener('click', function () {
        recognition.start()
    })

    recognition.onresult = function (event) {
        let transcript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript
        }

        campoPesquisa.value = transcript


        function submitForm() {
            document.getElementById('submitForm').submit()
        }
        setTimeout(submitForm, 3000);
    }

    recognition.onerror = function (event) {
        console.log('Error: ' + event.error)
    }

} else {
    console.log('Seu navegador não suporta a Web Speech API')
}