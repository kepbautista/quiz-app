/*
 * Created Date: May 10th 2025, 5:37:00 pm
 * Author: Kristine Bautista (kebautista@yondu.com)
 * Last Modified: May 10th 2025, 5:44:07 pm
 * Modified By: Kristine Bautista (kebautista@yondu.com)
 */

import { ReactNode } from "react"
import { Button } from "@/components/ui/button"

interface IQuestionSlideProps {
  header: string
  order: number
  question: string
  handleClickCorrect: () => void
  handleClickIncorrect: () => void
}

const QuestionSlide: React.FC<IQuestionSlideProps> = ({header, order, question, handleClickCorrect, handleClickIncorrect}: IQuestionSlideProps): ReactNode => {
  
  const generateQuestionText = (questionString: string): ReactNode => {
    const stimulusTokens: string[] = questionString.split('*')

    return (
      <p>
        {stimulusTokens[0]}
        <span className="font-bold">{stimulusTokens[1]}</span>
        {stimulusTokens[2]}
      </p>
    )
  }
  
  return (
    <div className="flex flex-col justify-between h-screen min-h-screen">
      <div className="flex flex-col justify-between gap-12 uppercase p-24 h-1/2">
        <h5>{header}</h5>
        <h1>{`Q${order}.`}</h1>
      </div>

      <div className="border border-y-2 px-24 py-12">
        {generateQuestionText(question)}
      </div>
      
      <div className="flex flex-row justify-around items-center p-24">
        <Button variant='plain' onClick={handleClickCorrect}>Correct</Button>
        <Button variant='plain' onClick={handleClickIncorrect}>Incorrect</Button>
      </div>
    </div>
  )
}

export default QuestionSlide
