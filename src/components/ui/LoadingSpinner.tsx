/*
 * Created Date: April 30th 2025, 1:25:13 pm
 * Author: Kristine Bautista (kebautista@yondu.com)
 * Last Modified: April 30th 2025, 1:25:38 pm
 * Modified By: Kristine Bautista (kebautista@yondu.com)
 */

import { ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

const LoadingSpinner: React.FC = (): ReactNode => (
  <div className="self-center mt-4">
    <Loader2 className="animate-spin" />
  </div>
)

export default LoadingSpinner
