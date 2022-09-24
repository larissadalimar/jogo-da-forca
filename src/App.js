import { useState } from 'react'
import palavras from './palavras'


export default function App(){
    const letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const [enabled, setEnabled] = useState(false)
    const [erros, setErros] = useState(0)
    const [palavraEscolhida, setPalavraEscolhida] = useState([])
    let caracteresPalavra = []

    function comecaJogo(){
        setEnabled(true)
        const palavra = (palavras[Math.floor(Math.random() * palavras.length)]).split('')
        setPalavraEscolhida(palavra)
        console.log(palavra)
        caracteresPalavra = Array(palavra.length).fill('_')
        console.log(caracteresPalavra)
    }

    return(
        <div>
            <div class="forca">
            <img src="./assets/forca0.png" alt=""/>
            <button class="escolher-palavra" onClick={comecaJogo}>Escolher Palavra</button>
            <div class={enabled? "escondido": "palavra-jogada"}>
                {caracteresPalavra.map((caractere) => <text>{caractere}</text>)}
            </div>
            </div>
            <div class="teclado">
                {letras.map((letra) => enabled? (<button class="enabled">{letra.toUpperCase()}</button>) :
                    (<button class="disabled">{letra.toUpperCase()}</button>))}
            </div>
            <div class="responder">
                <text>Já sei a palavra!</text>
                {enabled? <input></input> : <input disabled></input>}
                <button>Chutar</button>
            </div>
        </div>
    )
}