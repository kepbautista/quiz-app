/*
 * Created Date: April 30th 2025, 1:42:19 pm
 * Author: Kristine Bautista (kebautista@yondu.com)
 * Last Modified: May 10th 2025, 6:29:08 pm
 * Modified By: Kristine Bautista (kebautista@yondu.com)
 */
import QuestionSlide from "@/components/layouts/QuestionSlide"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { getApiService } from "@/service"
import useActivityStore from "@/useActivityStore"
import { NextRouter, useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"

const Activity: React.FC = (): ReactNode => {
  const router: NextRouter = useRouter()
  const { results, setResults } = useActivityStore()
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
    // already answered all questions in the activity
    if (answers.length > 0 && answers.length === questions.length) {
      setResults([...results, {
        activity_name: currentActivity?.activity_name ?? '',
        order: currentActivity?.order ?? 0,
        answers: [...answers]
      }])
    }
  }, [answers])

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
    else {
      const { activity_name, order } = currentActivity as ActivityType
      router.push(`/results?activity_name=${activity_name}&order=${order}`)
    }
  }

  if (!currentActivity) {
    return <LoadingSpinner />
  }

  return (
    <QuestionSlide
      header={currentActivity.activity_name}
      order={currentQuestionOrder}
      question={currentQuestion?.stimulus || ''}
      handleClickCorrect={() => handleButtonClick(true)}
      handleClickIncorrect={() => handleButtonClick(false)}
    />
  )
}

export default Activity
