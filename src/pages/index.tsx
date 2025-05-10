import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { NextRouter, useRouter } from "next/router";
import { ReactNode } from "react";

interface IHomeProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

export const getStaticProps = async () => {
  const response = await fetch(
      "https://s3.eu-west-2.amazonaws.com/interview.mock.data/payload.json"
    )
  const data = await response.json()

  return {
    props: { data }
  }
}

const Home: React.FC<IHomeProps> = ({ data }: IHomeProps): ReactNode => {
  const router: NextRouter = useRouter()

  const isActivityTwoQuestionType = (activity: ActivityType): boolean => {
    const question: QuestionType | MultiRoundQuestionType = activity.questions[0]
    
    if (question && 'round_title' in question && 'order' in question && 'questions' in question) {
      return true
    }

    return false
  }

  const handleActivityButtonClick = (order: number) => {
    const activity: ActivityType | undefined = data?.activities?.find((item: ActivityDetailsType) => item.order === order)

    if (activity) {
      // redirect based on activity type
      if (isActivityTwoQuestionType(activity)) {
        router.push(`/activity/multi-round/${order}`)
      }
      else {
        router.push(`/activity/${order}`)
      }
    }
  }

  if (!data) {
    return <LoadingSpinner />
  }

  const activityList: ActivityDetailsType[] = data.activities.map((activity: ActivityType) => (
    {
      activity_name: activity.activity_name,
      order: activity.order
    }
  ))

  return (
    <div
      className='flex flex-col items-center justify-between min-h-screen pt-24 gap-16 w-full'
    >
      <h3 className="uppercase">{data?.heading}</h3>
      <h1>{data?.name}</h1>

      <div className="flex flex-col uppercase w-full h-full">
        {
          activityList.map((details: ActivityDetailsType) => 
            <div key={details.activity_name} className='flex justify-between items-center border-t p-5 w-full h-full'>
              <Button
                key={details.activity_name}
                variant='plain'
                className='mx-auto text-base'
                onClick={() => handleActivityButtonClick(details.order)}>{details.activity_name}
              </Button>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Home
