'use client'
import { useEffect, useState } from 'react';
import CampaignBox from './components/CampaignBox';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from './loading';
import CampaignSheet from './components/CampaignSheet';

function page() {
  const [campaigns, setCampaigns] = useState<any>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [campaign, setCampaign] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  useEffect(() => {
    async function fetchCreators() {
      setDataLoading(true)
      try {
        const { data } = await axios.post('/api/campaigns')
        if (data.hasOwnProperty('success')) {
          setCampaigns(data.campaigns)
        } else {
          toast.error("Cannot fetch campaigns")
        }
      } catch (e) {
        toast.error("Cannot fetch campaigns")
      } finally {
        setDataLoading(false)
      }
    }
    fetchCreators()
  }, [])
  if (dataLoading) return <Loading />
  return (
    <>
      {
        campaigns?.map((campaign: any, index: any) => (
          <CampaignBox key={index} campaign={campaign} setSheetOpen={setSheetOpen} setCampaign={setCampaign} />
        ))
      }
      <CampaignSheet sheetOpen={sheetOpen} setSheetOpen={setSheetOpen} setCampaign={setCampaign} campaign={campaign} />
    </>
  )
}

export default page