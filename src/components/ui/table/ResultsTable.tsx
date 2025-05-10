/*
 * Created Date: May 10th 2025, 5:52:02 pm
 * Author: Kristine Bautista (kebautista@yondu.com)
 * Last Modified: May 10th 2025, 11:05:31 pm
 * Modified By: Kristine Bautista (kebautista@yondu.com)
 */

import { ReactNode } from 'react'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface IResultsTableProps {
  results: QuestionAnswerType[]
}

const ResultsTable: React.FC<IResultsTableProps> = ({results}: IResultsTableProps): ReactNode => {
  const displayAnswer = (answer: boolean): string => answer ? "correct" : "false"
  const computeScore = (): number => {
    let sum: number = 0

    if (results.length) {
      
      for (let i=0; i < results.length; i++) {
        if (results[i].correct_answer === results[i].user_answer) {
          sum++
        }
      }
    }

    return sum
  }
  
  return (
    <div className='mx-auto'>
        <Table>
          <TableHeader>
            <TableHead>#</TableHead>
            <TableHead>User Answer</TableHead>
            <TableHead className="text-right">Correct Answer</TableHead>
          </TableHeader>
          <TableBody className="uppercase">
            {
              results.map((item: QuestionAnswerType) => (
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
              <TableCell className="text-left" colSpan={2}>Score</TableCell>
              <TableCell className="text-right">{computeScore()}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
  )
}

export default ResultsTable
