/*
 * Created Date: May 10th 2025, 10:43:16 pm
 * Author: Kristine Bautista (kebautista@yondu.com)
 * Last Modified: May 10th 2025, 10:45:08 pm
 * Modified By: Kristine Bautista (kebautista@yondu.com)
 */

import { ReactNode } from 'react'

interface IResultsContainerProps {
  children: ReactNode
}

const ResultsContainer: React.FC<IResultsContainerProps> = ({children}: IResultsContainerProps): ReactNode => (
  <div className="flex flex-col items-center justify-between min-h-screen p-16">
    {children}
  </div>
)

export default ResultsContainer
