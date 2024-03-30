"use client"
import { getAllCategories } from '@/app/actions/getAllCategories'
import { getAllLanguages } from '@/app/actions/getAllLanguages'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChevronLeftIcon, ReloadIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Select from 'react-select'
import {
    Select as Sel,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import getCurrentUser from '@/app/actions/getCurrentUser'
import { calculateProfileCompletion } from '@/app/actions/calculateProfileCompletion'

type optionProps = {
    value: number | string,
    label: string,
    subLabels?: string[]
}

function ProfessionalCard({ setVisible, user, setProgress }: any) {
    const [isLoading, setIsLoading] = useState(false)
    const [charges, setCharges] = useState<any>("")
    const [unit, setUnit] = useState("")
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState<optionProps[]>();
    const [languages, setLanguages] = useState<optionProps[]>();
    const [subCategory, setSubCategory] = useState<optionProps[]>()
    const [subCategoryOptions, setSubCategoryOptions] = useState<optionProps[]>()
    const [languageOptions, setLanguageOptions] = useState<optionProps[]>()
    const [categoryOptions, setCategoryOptions] = useState<optionProps[]>()
    useEffect(() => {
        const fetchData = async () => {
            setCategoryOptions(await getAllCategories())
            setLanguageOptions(await getAllLanguages())
        }
        if (user) {
            setTitle(user.title)
            setCategory(user.categories.map((c: optionProps) => ({ value: c, label: c })))
            setSubCategory(user.subCategories.map((c: optionProps) => ({ value: c, label: c })))
            setLanguages(user.languagesSpoken.map((l: optionProps) => ({ value: l, label: l })))
            setCharges(user.charges)
            setUnit(user.unit)
        }
        fetchData();
    }, [])
    const fetchSubCategory = async () => {
        const subCat = await category?.map((item: any) => item.subLabels).flat();
        setSubCategoryOptions(subCat?.map((item: any, i: any) => ({
            value: i,
            label: item
        })))
    }
    const handleCategoryChange = async (selectedOptions: any) => {
        setCategory(selectedOptions)
    }
    const handleSubCategoryChange = async (selectedOptions: any) => {
        setSubCategory(selectedOptions)
    }

    const onSubmit = async () => {
        setIsLoading(true)
        const categories = category?.map((obj) => obj.label)
        const subCategories = subCategory?.map((obj) => obj.label)
        const languagesSpoken = languages?.map((obj) => obj.label)
        try {
            if (!title && !category && !subCategory && !languages && !charges) {
                return toast.error("Enter details to submit")
            }
            if (charges && isNaN(charges)) {
                return toast.error("Enter valid charges")
            }
            const c = parseInt(charges)
            const { data } = await axios.post('/api/profile', { title, subCategories, categories, languagesSpoken, charges: c, unit });
            if (data.hasOwnProperty('errors')) {
                toast.error("Data not stored. Try again")
            }
            if (data.hasOwnProperty('success')) {
                toast.success("Data Saved")
                setProgress(calculateProfileCompletion(data.user))
            }
        } catch (error) {
            return toast.error("Something went wrong")
        }
        finally {
            setIsLoading(false)
        }
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-xl'>Professional Information</CardTitle>
                <CardDescription>Fill out your work information</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-3'>
                <div className='flex gap-2'>
                    <div className='w-2/3'>
                        <Label htmlFor='title'>Title <span className='text-gray-500'>(Enter a single sentence description of your professional skills/experience)</span></Label>
                        <Input value={title} disabled={isLoading} id='title' onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className='w-1/3'>
                        <Label htmlFor='charges'>Charges<span className='text-gray-500'>($)</span></Label>
                        <div className="flex gap-1 items-center">
                            <Input value={charges} className='w-1/3' disabled={isLoading} id='charges' onChange={(e) => setCharges(e.target.value)} />
                            /
                            <Sel disabled={isLoading} onValueChange={(e) => setUnit(e)}>
                                <SelectTrigger className='w-2/3'>
                                    <SelectValue placeholder={`${unit ? unit.slice(4) : "Select type"}`} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PER_POST">POST</SelectItem>
                                    <SelectItem value="PER_VIDEO">VIDEO</SelectItem>
                                    <SelectItem value="PER_DAY">DAY</SelectItem>
                                    <SelectItem value="PER_HOUR">HOUR</SelectItem>
                                </SelectContent>
                            </Sel>
                        </div>
                    </div>
                </div>
                <div className='flex gap-3'>
                    <div className='w-full'>
                        <Label htmlFor='category'>Content Category</Label>
                        <Select value={category} isDisabled={isLoading} options={categoryOptions} isLoading={categoryOptions ? false : true} onChange={handleCategoryChange} isMulti isSearchable />
                    </div>
                </div>
                <div>
                    <div className='w-full'>
                        <Label htmlFor='category'>Sub Category</Label>
                        <Select value={subCategory} isDisabled={isLoading} onMenuOpen={fetchSubCategory} options={subCategoryOptions} onChange={handleSubCategoryChange} isMulti isSearchable />
                    </div>
                </div>
                <div>
                    <div className='w-full'>
                        <Label htmlFor='languages'>Languages Spoken</Label>
                        <Select value={languages} isDisabled={isLoading} options={languageOptions} onChange={(lang: any) => setLanguages(lang)} isLoading={languageOptions ? false : true} isMulti />
                    </div>
                </div>
                <div className='flex gap-1 justify-end'>
                    <Button onClick={() => setVisible("1")} disabled={isLoading} variant={'link'}><ChevronLeftIcon className='h-5 w-5' /></Button>
                    <Button disabled={isLoading} onClick={onSubmit}>
                        {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                        Save
                    </Button>
                    <Button disabled={isLoading} onClick={() => setVisible("3")} variant={'link'}>Next</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProfessionalCard