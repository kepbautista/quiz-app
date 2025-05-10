/*
 * Created Date: May 10th 2025, 2:39:03 pm
 * Author: Kristine Bautista (kebautista@yondu.com)
 * Last Modified: May 10th 2025, 3:14:47 pm
 * Modified By: Kristine Bautista (kebautista@yondu.com)
 */

import { ReactNode } from 'react'

interface IRoundTitleProps {
  activityTitle: string
  roundTitle: string
  handleClick?: () => void
}

const RoundTitle: React.FC<IRoundTitleProps> = ({activityTitle, roundTitle, handleClick}: IRoundTitleProps): ReactNode => {
  return (
   <div
    className='p-36 w-full h-full'
    onClick={handleClick}
  >
    <div className='flex flex-col gap-24 justify-between uppercase'>
      <h3>{activityTitle}</h3>
      <h1>{roundTitle}</h1>
    </div>
   </div> 
  )
}

export default RoundTitle
