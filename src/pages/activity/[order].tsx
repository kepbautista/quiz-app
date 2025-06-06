/*
 * Created Date: April 30th 2025, 1:42:19 pm
 * Author: Kristine Bautista (kebautista@yondu.com)
 * Last Modified: May 11th 2025, 11:36:22 am
 * Modified By: Kristine Bautista (kebautista@yondu.com)
 */
import QuestionSlide from "@/components/layouts/QuestionSlide"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { API_URL } from "@/constants"
import useActivityStore from "@/useActivityStore"
import { NextRouter, useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"

interface IActivityProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: { order: '1' }
      }
    ],
    fallback: false
  }
}

export const getStaticProps = async () => {
  const response = await fetch(
      API_URL
    )
  const data = await response.json()

  return {
    props: { data }
  }
}

const Activity: React.FC<IActivityProps> = ({ data }: IActivityProps): ReactNode => {
  const router: NextRouter = useRouter()
  const { results, setResults } = useActivityStore()
  const activityOrder: string = router.query.order as string
  const [currentActivity, setCurrentActivity] = useState<ActivityType>()
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [currentQuestionOrder, setCurrentQuestionOrder] = useState<number>(1)
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>()
  const [answers, setAnswers] = useState<QuestionAnswerType[]>([])

  useEffect(() => {
    if (router.isReady && activityOrder && data) {
        const activity: ActivityType | undefined = data?.activities?.find((item: ActivityDetailsType) => item.order === Number(activityOrder))
        
        if (activity) {
          setCurrentActivity({...activity})
          setQuestions([...activity.questions] as QuestionType[])
        }
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
