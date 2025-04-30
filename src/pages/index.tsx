import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { getApiService } from "@/service";
import { Geist, Geist_Mono } from "next/font/google";
import { NextRouter, useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Home: React.FC = (): ReactNode => {
  const [data, setData] = useState<ReadApiResponseType>()
  const router: NextRouter = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const data: ReadApiResponseType | null = await getApiService()
      
      if (data) {
        setData({...data})
      }
    }

    fetchData()
  }, [])

  const handleActivityButtonClick = (order: number) => {
    const activity: ActivityType | undefined = data?.activities?.find((item: ActivityDetailsType) => item.order === order)

    if (activity) {
      // TODO: redirect based on activity type
      router.push(`/activity/${order}`)
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
      className={`${geistSans.className} ${geistMono.className} flex flex-col items-center justify-between min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <h3 className="uppercase">{data?.heading}</h3>
      <h1>{data?.name}</h1>

      <div className="flex flex-col gap-5 uppercase">
        {
          activityList.map((details: ActivityDetailsType) => 
            <Button
              key={details.activity_name}
              onClick={() => handleActivityButtonClick(details.order)}>{details.activity_name}
            </Button>
          )
        }
      </div>

      <div>
        <p className="uppercase">Results</p>
      </div>
    </div>
  );
}

export default Home
