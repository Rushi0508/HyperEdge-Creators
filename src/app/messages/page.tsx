'use client'
import React, { useEffect, useState } from 'react'
import EmptyState from './components/EmptyState';

function page() {
    return (
        <div className='w-[75%]'>
            <EmptyState />
        </div>
    )
}

export default page
