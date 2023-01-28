import { ReactElement } from 'react';
import './App.css';
import Cards from './Components/Cards/Cards';
import CardsV2 from './Components/CardsV2/CardsV2';

function App(): ReactElement {
  return (
    <div className="App">
      <Cards
        containerWidth={700}
        cardsNumber={3}
        title="Ejemplo 1 (Lv1)"
        summary="El Card ocupa todo el tamañano del contenedor.
                El algoritmo de himán de apromación para el scroll hace que se reajuste la ubicación de la card cuando se aproxima
                a la posición de la próxima Card con una tolerancia de 30% del ancho de la card.
                El algoritmo aplica para N cards lo que lo hace totalmente configurable incluso en el ancho (style.width) del contenedor."
      />
      <Cards
        containerWidth={700}
        cardsNumber={5}
        title="Ejemplo 2"
        summary="Comprobando que algoritmo de reajuste de scroll funciona para N Cards. En este caso se comprueba el funcionamiento para 5 Cards."
      />
      
      <Cards
        containerWidth={500}
        cardsNumber={3}
        title="Ejemplo 3"
        summary="Recordar que contenedor es de ancho variable."
      />

      <hr />

      <CardsV2
        containerWidth={700}
        cardWidth={300}
        cardsNumber={3}
        title="Ejemplo 4 (Lv2)"
        summary="¿Qué sucede si el ancho de la Card también es variable?
          Se trabaja con cards de ancho variable pero se elimina el
          scroll para evitar la complejidad de la interacción con el mouse y el scroll.
          En este caso se hace un recorrido en bucle de todas las Cards.
        "
      />

      <h1>Ejemplo 5 (Lv3)</h1>
      <p>Cards de ancho variable e interacción con scroll horizontal. EN DESARROLLO...</p>
    </div>
  );
}

export default App;
