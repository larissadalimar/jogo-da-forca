import { useState } from 'react'
import palavras from './palavras'

function ButtonLetter(props){
    const [isClicked, setIsClicked] = useState(false)

    function selectLetra(letra){

        setIsClicked(true)
        let novoArray = [...props.caracteresPalavra]

        if(props.palavraAdvinhada.includes(letra)){
            let index = props.palavraAdvinhada.indexOf(letra) 
            novoArray[index] = props.palavraEscolhida[index]
            while(props.palavraAdvinhada.indexOf(letra, index+1) !== -1){
                index = props.palavraAdvinhada.indexOf(letra, index+1)
                novoArray[index] = props.palavraEscolhida[index]
            }
            props.setCaracteresPalavra(novoArray)
        }else{
            props.setErros(props.erros+1)
            props.setForca(`./assets/forca${props.erros+1}.png`)
            if((props.erros + 1) === 6){
               props.setEnabled(false)
               props.setCaracteresPalavra(props.palavraEscolhida)
               props.setCorPalavra("palavra-jogada vermelho")
               setIsClicked(false)
            }
        }

        if(JSON.stringify(novoArray) === JSON.stringify(props.palavraEscolhida)){
            props.setEnabled(false)
            props.setCorPalavra("palavra-jogada verde")
            props.setCaracteresPalavra(props.palavraEscolhida)
            setIsClicked(false)
        }

    }
    
    return(<button class={(!isClicked && props.enabled)? "enabled" : "disabled"} data-identifier="letter" onClick={() => {if(!isClicked && props.enabled) selectLetra(props.letra.toLowerCase())}}>{props.letra}</button>)
}

export default function App(){
    const letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const [enabled, setEnabled] = useState(false)
    const [erros, setErros] = useState(0)
    const [palavraEscolhida, setPalavraEscolhida] = useState([])
    const [caracteresPalavra, setCaracteresPalavra ]= useState([])
    const [forca, setForca] = useState("./assets/forca0.png")
    const [palavraAdvinhada, setPalavraAdvinhada] = useState("")
    const [corPalavra, setCorPalavra] = useState("palavra-jogada")
    const [chute, setChute] = useState("")
    //const imagensDaForca = ["forca0.png", "forca1.png", "forca2.png", "forca3.png", "forca4.png", "forca5.png", "forca6.png"]

    function comecaJogo(){
        setEnabled(true)
        const palavra = (palavras[Math.floor(Math.random() * palavras.length)])
        setPalavraAdvinhada(palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(''))
        setPalavraEscolhida(palavra.split(''))
        setCorPalavra("palavra-jogada")
        setForca("./assets/forca0.png")
        setErros(0)
        setChute("")
        setCaracteresPalavra(Array(palavra.length).fill('_'))
        console.log(palavra)
    }

    function ChutaPalavra(){
        let comparaChute = chute.toLowerCase().split('')
        if(JSON.stringify(comparaChute) === JSON.stringify(palavraEscolhida)){
            setCaracteresPalavra(palavraEscolhida)
            setCorPalavra("palavra-jogada verde")
        }else{
            setCaracteresPalavra(palavraEscolhida)
            setCorPalavra("palavra-jogada vermelho")
            setForca('./assets/forca6.png')
        }
        setEnabled(false)
    }

    return(
        <div>
            <div class="forca">
                <img data-identifier="game-image" src={forca} alt=""/>
                <div>
                    <button class="escolher-palavra" data-identifier="choose-word" onClick={comecaJogo}>Escolher Palavra</button>
                    <div class={corPalavra} data-identifier="word">
                        {caracteresPalavra.map((caractere) => <text>{caractere} </text>)}
                    </div>
                </div>
            </div>
            <div class="teclado">
                {letras.map((letra) => <ButtonLetter letra={letra.toUpperCase()} caracteresPalavra={caracteresPalavra} palavraAdvinhada = {palavraAdvinhada}
                  palavraEscolhida={palavraEscolhida} setCaracteresPalavra={setCaracteresPalavra}
                  setErros={setErros} erros={erros} setForca={setForca}
                  setEnabled={setEnabled}
                  setCorPalavra={setCorPalavra} enabled={enabled}/>)}
            </div>
            <div class="responder">
                <text>Já sei a palavra!</text>
                {enabled? <input data-identifier="type-guess" value={chute} onChange={(event) => setChute(event.target.value)}></input> : <input disabled></input>}
                <button data-identifier="guess-button" onClick={() => {if(enabled) ChutaPalavra()}}>Chutar</button>
            </div>
        </div>
    )
}