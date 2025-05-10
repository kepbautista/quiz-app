/*
 * Created Date: May 10th 2025, 5:10:46 pm
 * Author: Kristine Bautista (kebautista@yondu.com)
 * Last Modified: May 10th 2025, 10:53:07 pm
 * Modified By: Kristine Bautista (kebautista@yondu.com)
 */

import ResultsContainer from '@/components/layouts/ResultsContainer'
import HomeButton from '@/components/ui/button/HomeButton'
import ResultsTable from '@/components/ui/table/ResultsTable'
import useActivityStore from '@/useActivityStore'
import { NextRouter, useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'

const ActivityTwoResultsPage: React.FC = (): ReactNode => {
  const router: NextRouter = useRouter()
  const { multiRoundResults } = useActivityStore()
  const [displayResults, setDisplayResults] = useState<MultiRoundResultsType>()

  useEffect(() => {
    if (router.isReady) {
      const {activity_name, order} = router.query
      const activityResults: MultiRoundResultsType[] = multiRoundResults.filter((item: MultiRoundResultsType) => item.activity_name === (activity_name as string).replace('+', ' ') && item.order === Number(order))
      const latestResults: MultiRoundResultsType | undefined = activityResults.pop()
      setDisplayResults(latestResults ? {...latestResults} : latestResults)
    }
  }, [router.isReady])
  
  return (
    <ResultsContainer>
      <h4>{displayResults?.activity_name}</h4>
      <h1>Results</h1>
      {
        displayResults?.results?.map((item: MultiRoundQuestionAnswerType) => (
          <div key={item.round_title}>
            <h5>{item.round_title}</h5>
            <ResultsTable results={item.answers}/>
          </div>
        ))
      }
      <HomeButton />
    </ResultsContainer>
  )
}

export default ActivityTwoResultsPage
