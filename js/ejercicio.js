cargarDatos = () => {
    fetch("https://dataserverdaw.herokuapp.com/escritores/xml")
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");

            let escritores = xml.getElementsByTagName('escritor')
            // console.log(escritores)

            for (let escritor of escritores) {
                let id = escritor.getElementsByTagName('id')[0].textContent
                let nombre = escritor.getElementsByTagName('nombre')[0].textContent

                let plantilla = `<option value="${id}">${nombre}</option>`
                document.querySelector('div.input-group > select').innerHTML += plantilla
            }
        })
        .catch(console.error);
};
window.addEventListener('DOMContentLoaded', (event) => {
    cargarDatos();
});


let selectElemento = document.querySelector('.custom-select');
selectElemento.addEventListener('change', (eventChange) => {
    fetch("https://dataserverdaw.herokuapp.com/escritores/frases")
        .then(response => response.json())
        .then(data => {
            let arreglo = data.frases.filter((frase)=> {
                return frase.id_autor == parseInt(eventChange.target.value);
            
            })
            let nombre = document.getElementsByTagName('option')[eventChange.target.selectedIndex].innerHTML;
            let text;
            let contenido = document.querySelector('#frases')
            contenido.innerHTML = '';
            for (let i = 0; i < arreglo.length; i++) {
                text = arreglo[i].texto;
                plantilla =
                    `<div class="col-lg-3">
                        <div class="test-inner ">
                            <div class="test-author-thumb d-flex">
                                <div class="test-author-info">
                                    <h4>${nombre}</h4>                                            
                                </div>
                            </div>
                        <span>${text}</span>
                        <i class="fa fa-quote-right"></i>
                        </div>
                    </div>`
            contenido.innerHTML += plantilla;
            }
            
        });


});





