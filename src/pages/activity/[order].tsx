/*
 * Created Date: April 30th 2025, 1:42:19 pm
 * Author: Kristine Bautista (kebautista@yondu.com)
 * Last Modified: April 30th 2025, 5:53:34 pm
 * Modified By: Kristine Bautista (kebautista@yondu.com)
 */

import { Button } from "@/components/ui/button"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { getApiService } from "@/service"
import useActivityStore from "@/useActivityStore"
import { NextRouter, useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"

const Activity: React.FC = ( ): ReactNode => {
  const router: NextRouter = useRouter()
  const { results, setActivities, setResults } = useActivityStore()
  const activityOrder: string = router.query.order as string
  const [currentActivity, setCurrentActivity] = useState<ActivityType>()
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [currentQuestionOrder, setCurrentQuestionOrder] = useState<number>(1)
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>()
  const [answers, setAnswers] = useState<QuestionAnswerType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data: ReadApiResponseType | null = await getApiService()
      
      if (data) {
        setActivities([...data.activities])

        const activity: ActivityType | undefined = data?.activities?.find((item: ActivityDetailsType) => item.order === Number(activityOrder))
        
        if (activity) {
          setCurrentActivity({...activity})
          setQuestions([...activity.questions] as QuestionType[])
        }
      }
    }
    
    if (router.isReady && activityOrder) {
      fetchData()
    }
  }, [router.isReady, activityOrder])

  useEffect(() => {
    if (currentActivity) {
      const question: QuestionType | undefined = questions.find((item: QuestionType) => item.order === currentQuestionOrder)

      if (question) {
        setCurrentQuestion({...question})
      }
    }
  }, [currentActivity, currentQuestionOrder, questions])

  useEffect(() => {
    if (answers.length > 0 && answers.length === questions.length) {
      setResults([...results, {
        activity_name: currentActivity?.activity_name ?? '',
        order: currentActivity?.order ?? 0,
        answers: [...answers]
      }])
    }
  }, [answers])

  const generateQuestionText = (): ReactNode => {
    const stimulusTokens: string[] = currentQuestion?.stimulus ? currentQuestion.stimulus.split('*') : []

    return (
      <p>
        {stimulusTokens[0]}
        <span className="font-bold">{stimulusTokens[1]}</span>
        {stimulusTokens[2]}
      </p>
    )
  }

  const handleButtonClick = (user_answer: boolean) => {
    if (currentQuestion) {
      setAnswers([
        ...answers,
        {
          order: currentQuestionOrder,
          correct_answer: currentQuestion.is_correct,
          user_answer
        }
      ])
    }
    
    if (currentQuestionOrder < questions.length) {
      setCurrentQuestionOrder(currentQuestionOrder + 1)
    }
  }

  if (!currentActivity) {
    return <LoadingSpinner />
  }

  return (
    <div className="flex flex-col justify-between h-screen min-h-screen">
      <div className="flex flex-col justify-between gap-12 uppercase p-24 h-1/2">
        <h5>{currentActivity.activity_name}</h5>
        <h1>{`Q${currentQuestionOrder}.`}</h1>
      </div>

      <div className="border border-y-2 px-24 py-12">
        {generateQuestionText()}
      </div>
      
      <div className="flex flex-row justify-around items-center p-24">
        <Button variant='plain' onClick={() => handleButtonClick(true)}>Correct</Button>
        <Button variant='plain' onClick={() => handleButtonClick(false)}>Incorrect</Button>
      </div>
    </div>
  )
}

export default Activity
