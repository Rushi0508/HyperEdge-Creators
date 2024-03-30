'use client'
import { useEffect, useState } from 'react';
import CampaignBox from './components/CampaignBox';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from './loading';
import CampaignSheet from './components/CampaignSheet';
import SearchBar from './components/SearchBar';

function page() {
  const [campaigns, setCampaigns] = useState<any>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [campaign, setCampaign] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [categories, setCategories] = useState("")
  useEffect(() => {
    async function fetchCreators() {
      setDataLoading(true)
      try {
        const { data } = await axios.post('/api/campaigns', { query: categories })
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
  }, [categories])
  return (
    <>
      <div className='my-5 w-3/5'>
        <SearchBar setCategories={setCategories} />
      </div>
      {
        dataLoading ? <Loading /> :
          <>
            {
              categories == "All" ?
                <p className='text-sm italic text-gray-500'>Showing campaigns of all categories</p> :
                <p className='text-sm italic text-gray-500'>Showing campaigns based on your {categories ? "selected" : "profile"} categories</p>
            }
            {
              campaigns && campaigns.length == 0 ? <p className='my-5 font-semibold text-center text-gray-500 text-lg'>No Campaigns Found</p> :
                campaigns?.map((campaign: any, index: any) => (
                  <CampaignBox key={index} campaign={campaign} setSheetOpen={setSheetOpen} setCampaign={setCampaign} />
                ))
            }
            <CampaignSheet sheetOpen={sheetOpen} setSheetOpen={setSheetOpen} setCampaign={setCampaign} campaign={campaign} />
          </>
      }
    </>
  )
}

export default page