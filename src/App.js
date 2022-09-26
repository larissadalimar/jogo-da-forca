import { useState } from 'react'
import palavras from './palavras'


export default function App(){
    const letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const [enabled, setEnabled] = useState(false)
    const [erros, setErros] = useState(0)
    const [palavraEscolhida, setPalavraEscolhida] = useState([])
    const [caracteresPalavra, setCaracteresPalavra ]= useState([])
    const [forca, setForca] = useState("./assets/forca0.png")
    const [palavraAdvinhada, setPalavraAdvinhada] = useState("")
    const [corPalavra, setCorPalavra] = useState("palavra-jogada")
    //const imagensDaForca = ["forca0.png", "forca1.png", "forca2.png", "forca3.png", "forca4.png", "forca5.png", "forca6.png"]

    function comecaJogo(){
        setEnabled(true)
        const palavra = (palavras[Math.floor(Math.random() * palavras.length)])
        setPalavraAdvinhada(palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(''))
        setPalavraEscolhida(palavra.split(''))
        setCorPalavra("palavra-jogada")
        setForca("./assets/forca0.png")
        setErros(0)
        setCaracteresPalavra(Array(palavra.length).fill('_'))
        console.log(palavra)
    }

    function ButtonLetter(props){
        const [isClicked, setIsClicked] = useState(false)
    
        function selectLetra(letra){
            let novoArray = [...caracteresPalavra]
            console.log(palavraAdvinhada)

            if(palavraAdvinhada.includes(letra)){
                let index = palavraAdvinhada.indexOf(letra) 
                novoArray[index] = palavraEscolhida[index]
                console.log(novoArray[index])
                while(palavraAdvinhada.indexOf(letra, index+1) !== -1){
                    index = palavraAdvinhada.indexOf(letra, index+1)
                    novoArray[index] = palavraEscolhida[index]
                    console.log(novoArray[index])
                }
                setCaracteresPalavra(novoArray)
            }else{
                setErros(erros+1)
                setForca(`./assets/forca${erros+1}.png`)
                if((erros + 1) === 6){
                   setEnabled(false)
                   setCaracteresPalavra(palavraEscolhida)
                   setCorPalavra("palavra-jogada vermelho")
                }
            }

            if(JSON.stringify(novoArray) === JSON.stringify(palavraEscolhida)){
                setCorPalavra("palavra-jogada verde")
            }

            setIsClicked(true)
            console.log("chegando ao final")
        }
    
        
        return(<button class={!isClicked && enabled? "enabled" : "disabled"} onClick={() => {if(!isClicked && enabled) selectLetra(props.letra.toLowerCase())}}>{props.letra}</button>)
    }

    return(
        <div>
            <div class="forca">
                <img src={forca} alt=""/>
                <div>
                    <button class="escolher-palavra" onClick={comecaJogo}>Escolher Palavra</button>
                    <div class={corPalavra}>
                        {caracteresPalavra.map((caractere) => <text>{caractere} </text>)}
                    </div>
                </div>
            </div>
            <div class="teclado">
                {letras.map((letra) => <ButtonLetter letra={letra.toUpperCase()}/>)}
            </div>
            <div class="responder">
                <text>Já sei a palavra!</text>
                {enabled? <input></input> : <input disabled></input>}
                <button>Chutar</button>
            </div>
        </div>
    )
}