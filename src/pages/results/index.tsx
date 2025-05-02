/*
 * Created Date: April 30th 2025, 6:03:17 pm
 * Author: Kristine Bautista (kebautista@yondu.com)
 * Last Modified: May 2nd 2025, 9:15:39 pm
 * Modified By: Kristine Bautista (kebautista@yondu.com)
 */

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useActivityStore from "@/useActivityStore"
import { NextRouter, useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"

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

  console.log({
    id: 'results-log',
    displayResults,
  })

  const displayAnswer = (answer: boolean): string => answer ? "correct" : "false"
  
  const computeScore = (): number => {
    let sum: number = 0

    if (displayResults?.answers?.length) {
      const answers: QuestionAnswerType[] = displayResults.answers
      
      for (let i=0; i < displayResults?.answers.length; i++) {
        if (answers[i].correct_answer === answers[i].user_answer) {
          sum++
        }
      }
    }

    return sum
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-16">
      <h4>{displayResults?.activity_name}</h4>
      <h1>Results</h1>

      <div className="max-w-1/2">
        <Table>
          <TableHeader>
            <TableHead>#</TableHead>
            <TableHead>User Answer</TableHead>
            <TableHead className="text-right">Correct Answer</TableHead>
          </TableHeader>
          <TableBody className="uppercase">
            {
              displayResults?.answers?.map((item: QuestionAnswerType) => (
                <TableRow key={`answer-${item.order}`}>
                  <TableCell>{`Q${item.order}`}</TableCell>
                  <TableCell>{displayAnswer(item.user_answer)}</TableCell>
                  <TableCell className="text-right font-bold">{displayAnswer(item.correct_answer)}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Score</TableCell>
              <TableCell className="text-right">{computeScore()}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <Button
        variant='plain'
        onClick={() => router.push('/')}
      >
        Home
      </Button>
    </div>
  )
}

export default ResultsPage
