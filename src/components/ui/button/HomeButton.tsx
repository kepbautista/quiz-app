/*
 * Created Date: May 10th 2025, 9:51:30 pm
 * Author: Kristine Bautista (kebautista@yondu.com)
 * Last Modified: May 10th 2025, 9:54:52 pm
 * Modified By: Kristine Bautista (kebautista@yondu.com)
 */

import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { NextRouter, useRouter } from "next/router"

const HomeButton: React.FC = (): ReactNode => {
  const router: NextRouter = useRouter()
  
  return (
    <Button
        variant='plain'
        onClick={() => router.push('/')}
        className="font-bold"
      >
        Home
      </Button>
  )
}

export default HomeButton
