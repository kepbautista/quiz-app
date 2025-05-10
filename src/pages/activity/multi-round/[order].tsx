/*
 * Created Date: May 10th 2025, 6:09:38 pm
 * Author: Kristine Bautista (kebautista@yondu.com)
 * Last Modified: May 10th 2025, 7:40:26 pm
 * Modified By: Kristine Bautista (kebautista@yondu.com)
 */
import QuestionSlide from '@/components/layouts/QuestionSlide'
import RoundTitle from '@/components/layouts/RoundTitle'
import { getApiService } from '@/service'
import { NextRouter, useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'

const MultiRoundActivity: React.FC = (): ReactNode => {
  const router: NextRouter = useRouter()
  const activityOrder: string = router.query.order as string
  
  const [activityName, setActivityName] = useState<string>('')
  const [questions, setQuestions] = useState<ActivityTwoQuestionType[]>([])
  
  const [currentRound, setCurrentRound] = useState<number>(0)
  const [currentRoundTitle, setCurrentRoundTitle] = useState<string>('')
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>()
  const [currentQuestionOrder, setCurrentQuestionOrder] = useState<number>(0)

  const [isQuestionMode, setIsQuestionMode] = useState<boolean>(false)
  
  useEffect(() => {
    const fetchData = async () => {
      const data: ReadApiResponseType | null = await getApiService()
          
      if (data) {
        const activity: ActivityType | undefined = data?.activities?.find((item: ActivityDetailsType) => item.order === Number(activityOrder))

        if (activity) {
          setActivityName(activity.activity_name ?? '')
          setQuestions([...activity.questions] as ActivityTwoQuestionType[])

          const current: ActivityTwoQuestionType = activity.questions[0] as ActivityTwoQuestionType
          setRound(current)
        }
      }
    }
    
    if (router.isReady && activityOrder) {
      fetchData()
    }
  }, [router.isReady, activityOrder])

  const handleClickOnRoundPage = () => {
    setIsQuestionMode(true)
  }

  const setRound = (round: ActivityTwoQuestionType) => {
    setCurrentRound(round.order)
    setCurrentRoundTitle(round.round_title)
    setCurrentQuestion({...round.questions[0]})
    setCurrentQuestionOrder(1)
  }

  const handleButtonClick = (user_answer: boolean) => {
    console.log('clicked: ', user_answer)
    if (currentQuestionOrder < questions[currentRound - 1].questions.length) {
      setCurrentQuestion({...questions[currentRound - 1].questions[currentQuestionOrder]})
      setCurrentQuestionOrder(currentQuestionOrder + 1)
    }
    else if (currentRound === questions.length) {
      // TODO: redirect to results page
      console.log('end of activity 2!!!')
    }
    else {
      setIsQuestionMode(false)
      setRound({...questions[currentRound]})
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
