import { useEffect, useState } from "react";
import { createComment } from "../../services/requests";
import { AutorComentario, BotaoCondicional, ComentarioContainer, ComentarioDoAutor, ContainerCurtir, ContainerItem, InputComentar } from "./style";
import Curtir from "../Curtir/Curtir";


const Comentar = ({postId, comments, autorId}) => {
    const [novoComentario, setNovoComentario] = useState('')
    const [Comentarios, setNovoComentarios] = useState([])
    const [mostrarComentarios, setMostrarComentarios] = useState(false)

    const adicionarComentario = ()=>{
        if(novoComentario.trim() !== ''){
            createComment(postId, novoComentario)
            setNovoComentario(...comments, novoComentario)
            setNovoComentario('')
        }
    }

   useEffect(()=> {
    adicionarComentario()
   }, [])
   const novosComentario = comments.map((comentario)=>{
        return(<ComentarioContainer key={comentario.comment_id}>
            <AutorComentario>{comentario.creator_name}:</AutorComentario>
            <ComentarioDoAutor>{comentario.comment}</ComentarioDoAutor>
            </ComentarioContainer>
            )

   })

    return (

        <>
            <ContainerItem>
                <BotaoCondicional onClick={()=> setMostrarComentarios
                (!mostrarComentarios)}>
                    {mostrarComentarios ? ('Fechar') : ('Comentar')}
                </BotaoCondicional>
                {mostrarComentarios && (
                    <ContainerCurtir>
                        <div>
                            <InputComentar
                            placeholder="comentario"
                            value={novoComentario}
                            onChange={(e) => setNovoComentario(e.target.value)}
                            />
                            <button onClick={adicionarComentario}>Enviar</button>
                        </div>
                        {novosComentario}
                        </ContainerCurtir>


                )}
                </ContainerItem>

            
         
             

            
        </>
    )
}

export default Comentar