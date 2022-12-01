//javascript.js



//Opciones del mapa 
var myLatLng = { lat: 4.68113419, lng: -74.09295500 };//Donde inicia el mapa


/*Se configuran las opciones del mapa desde el zoom hasta el tipo de mapa que queremos */
var mapOptions = {
    center: myLatLng,/*Mapa con cordenadas por defecto */
    zoom: 10,/*Zoom del mapa */
    mapTypeId: google.maps.MapTypeId.ROADMAP/*Tipo de mapa que queremos en este caso de CARRETERA revisar documentacion de google */
};


//Variable mapa
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);/*Crea un mapa y lo asigna al div con el id 'googleMap' y le asigna las opciones del mapa creadas 'mapOptions'*/

//Variable que almacena el resultado de nuestra solicitud de punto de partida y punto de llegada
var directionsService = new google.maps.DirectionsService();

//Variable que me sirve para trazar la ruta
var directionsDisplay = new google.maps.DirectionsRenderer();

//Sirve para trazar la ruta en el mapa creado
directionsDisplay.setMap(map);


//Funcion que calcula la ruta cuando se le da click al boton 
function calcRoute() {
    //variable que sirve para crear nuestras solicitudes 
    var request = {
        origin: document.getElementById("from").value,/*Recibe el elemento de texto con el punto de partida */
        destination: document.getElementById("to").value,/*Recibe el elemento de texto con el punto de llegada */
        travelMode: google.maps.TravelMode.DRIVING, // Tipo de modo en el que se va hacer el recorrido existe en  caminando, y en cicla "WALKING, BYCYCLING"
        unitSystem: google.maps.UnitSystem.IMPERIAL //Unidades del sistema
    }

    //Pasa la solicitud a los metodos 
    directionsService.route(request, function (result, status) {/* Utilizando la variable que almacena nuestra solicitud. LE enviamos nuestra solicitud "request", en una funcion con dos parametros un resultado "result" y un estado de la solicitud "status"*/
        if (status == google.maps.DirectionsStatus.OK) {/*Si encuentra la ruta del punto de partida al punto de llegada */

            //Se obtine la distancia y el tiempo
            const output = document.querySelector('#output');//Obtine la informacion de la distancia tiempo y recorrido de los puntos puestos por el usuario y los alverga en el div de output 
            //Sirve para mostrar la informacion recolectada en la variabel anterior 
            output.innerHTML = "<div class='alert-info'>PUNTO DE PARTIDA: " + document.getElementById("from").value + ".<br />PUNTO DE DESTINO: " + document.getElementById("to").value + ".<br />DISTACIA CONDUCIENDO <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />DURACION DEL TRAYECTO <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";//Se crea un contenedor con el punto de partida, el punto de llegada, la distancia y la duracion del recorrido
            //Traza la ruta en el mapa
            directionsDisplay.setDirections(result);//Se le envia result que alverga la latitud y longitud de los puntos de llegada y partida para que la variable pueda trazar la ruta
        } else {/*Si no encuentra la ruta del punto de partida al punto de llegada */

            //Elimina la ruta del mapa 
            directionsDisplay.setDirections({ routes: [] });//Borra las rutas del mapa 
            //Vuelve y centra el mapa en mi variable latitud y longitud "Bogota"
            map.setCenter(myLatLng);
            //Sirve para mostrar el mensaje de error por no encontrar la ruta 
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> NO ES POSIBLE LLEGAR AL DESTINO EN AUTOMOVIL.</div>";
        }
    });

}



//Crea el autocompletado de los cuadro de texto a la hora de ingresar un sitio 

/*Variable option que tiiene una propiedad que tiene los Sitios */
var options = {
    types: ['(cities)']//Sitios
}

var input1 = document.getElementById("from");/*Se guarda el cuadro de texto del punto de partida en una variable*/
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);//se le asigna el autocompletado teniendo como referencia el imput1 = punto de partida y los sitios

var input2 = document.getElementById("to");/*Se guarda el cuadro de texto del punto de llegada en una variable*/
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);//se le asigna el autocompletado teniendo como referencia el imput1 = punto de partida y los sitios
