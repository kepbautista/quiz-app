/*
 * Created Date: May 10th 2025, 6:09:38 pm
 * Author: Kristine Bautista (kebautista@yondu.com)
 * Last Modified: May 11th 2025, 11:42:48 am
 * Modified By: Kristine Bautista (kebautista@yondu.com)
 */
import QuestionSlide from '@/components/layouts/QuestionSlide'
import RoundTitle from '@/components/layouts/RoundTitle'
import { API_URL } from '@/constants'
import useActivityStore from '@/useActivityStore'
import { NextRouter, useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'

interface IMultiRoundActivityProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: { order: '2' }
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

const MultiRoundActivity: React.FC<IMultiRoundActivityProps> = ({data}: IMultiRoundActivityProps): ReactNode => {
  const router: NextRouter = useRouter()
  const activityOrder: string = router.query.order as string
  const {multiRoundResults, setMultiRoundResults} = useActivityStore()
  
  const [activityName, setActivityName] = useState<string>('')
  const [questions, setQuestions] = useState<MultiRoundQuestionType[]>([])
  const [answers, setAnswers] = useState<QuestionAnswerType[]>([])
  const [results, setResults] = useState<MultiRoundQuestionAnswerType[]>([])
  
  const [currentRound, setCurrentRound] = useState<number>(0)
  const [currentRoundTitle, setCurrentRoundTitle] = useState<string>('')
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>()
  const [currentQuestionOrder, setCurrentQuestionOrder] = useState<number>(0)

  const [isQuestionMode, setIsQuestionMode] = useState<boolean>(false)
  
  useEffect(() => {
      if (router.isReady && activityOrder && data) {
        const activity: ActivityType | undefined = data?.activities?.find((item: ActivityDetailsType) => item.order === Number(activityOrder))

        if (activity) {
          setActivityName(activity.activity_name ?? '')
          setQuestions([...activity.questions] as MultiRoundQuestionType[])

          const current: MultiRoundQuestionType = activity.questions[0] as MultiRoundQuestionType
          setRound(current)
        }
      }
  }, [router.isReady, activityOrder])

  const handleClickOnRoundPage = () => {
    setIsQuestionMode(true)
  }

  const setRound = (round: MultiRoundQuestionType) => {
    setCurrentRound(round.order)
    setCurrentRoundTitle(round.round_title)
    setCurrentQuestion({...round.questions[0]})
    setCurrentQuestionOrder(1)
  }

  const handleButtonClick = (user_answer: boolean) => {
    if (!currentQuestion) {
      return
    }
    
    if (currentQuestionOrder < questions[currentRound - 1].questions.length) {
      setCurrentQuestion({...questions[currentRound - 1].questions[currentQuestionOrder]})
      setCurrentQuestionOrder(currentQuestionOrder + 1)
      setAnswers([...answers, {order: currentQuestionOrder, correct_answer: currentQuestion.is_correct, user_answer}])
    }
    else {
      const currentResults: MultiRoundQuestionAnswerType[] = [...results, {round_title: currentRoundTitle, answers: [...answers, {order: currentQuestionOrder, correct_answer: currentQuestion.is_correct, user_answer}]}]
      setResults([...currentResults])
      
      if (currentRound === questions.length) {
        if (multiRoundResults.length > 0) {
          setMultiRoundResults([
            ...multiRoundResults,
            {
              activity_name: activityName,
              order: Number(activityOrder),
              results: [...currentResults]
            }
          ])
        }
        else {
          setMultiRoundResults([
            {
              activity_name: activityName,
              order: Number(activityOrder),
              results: [...currentResults]
            }
          ])
        }
        router.push(`/results/multi-round?activity_name=${activityName}&order=${activityOrder}`)
      }
      else {
        setIsQuestionMode(false)
        setRound({...questions[currentRound]})
        setAnswers([])
      }
    } 
  }
  
  if (!isQuestionMode) {
    return (
      <RoundTitle
        activityTitle={activityName}
        roundTitle={currentRoundTitle}
        handleClick={handleClickOnRoundPage}
      />
    )
  }

  return (
    <QuestionSlide
      header={`${activityName} / ${currentRoundTitle}`}
      order={currentQuestion?.order || 0}
      question={currentQuestion?.stimulus || ''}
      handleClickCorrect={() => handleButtonClick(true)}
      handleClickIncorrect={() => handleButtonClick(false)}
    />
  )
}

export default MultiRoundActivity
