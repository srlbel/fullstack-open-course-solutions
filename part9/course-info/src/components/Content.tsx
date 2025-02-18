import { JSX } from 'react'

type Content = {
  name: string,
  exerciseCount: number
}

interface ContentProps {
  content: Content[];
}

const Content = ({ content } : ContentProps): JSX.Element => {
  return (
    <>
    {content.map((c, i) => <p key={i}>{c.name} {c.exerciseCount}</p>)}
    </>
  )

}

export default Content;