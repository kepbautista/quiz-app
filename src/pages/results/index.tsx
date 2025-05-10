/*
 * Created Date: April 30th 2025, 6:03:17 pm
 * Author: Kristine Bautista (kebautista@yondu.com)
 * Last Modified: May 10th 2025, 10:45:22 pm
 * Modified By: Kristine Bautista (kebautista@yondu.com)
 */

import ResultsTable from "@/components/ui/table/ResultsTable"
import useActivityStore from "@/useActivityStore"
import { NextRouter, useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"
import HomeButton from "@/components/ui/button/HomeButton"
import ResultsContainer from "@/components/layouts/ResultsContainer"

const ResultsPage: React.FC = (): ReactNode => {
  const { results } = useActivityStore()
  const router: NextRouter = useRouter()
  const [displayResults, setDisplayResults] = useState<ResultsType>()
  
  useEffect(() => {
    if (router.isReady) {
      const {activity_name, order} = router.query
      const activityResults: ResultsType[] = results.filter((item: ResultsType) => item.activity_name === (activity_name as string).replace('+', ' ') && item.order === Number(order))
      const latestResults: ResultsType | undefined = activityResults.pop()
      setDisplayResults(latestResults ? {...latestResults} : latestResults)
    }
  }, [router.isReady])

  return (
    <ResultsContainer>
      <h4>{displayResults?.activity_name}</h4>
      <h1>Results</h1>
      {displayResults && <ResultsTable results={displayResults.answers} />}
      <HomeButton />
    </ResultsContainer>
  )
}

export default ResultsPage
