"use client"
import { useEffect, useState } from 'react'
import Image from 'next/image';
import { Input } from '../ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const Search = () => {
    const [query, setQuery] = useState(''); // query state

    const router = useRouter();

    const searchParams = useSearchParams();    

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            let newUrl = '';
            if(query ){
                const newUrl = formUrlQuery({
                    params:searchParams.toString(),
                    key:'query',
                    value:query
                })
            } else {
                const newUrl = removeKeysFromQuery({
                    params:searchParams.toString(),
                    keysToRemove: ['query']
                })
            }

            router.push(newUrl,{scroll:false});
        }, 300)
        return () => clearTimeout(delayDebounceFn);
    },[query, searchParams, router])
    
  return (
    <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
        <Image src= "/assets/icons/search.svg" alt="search" width={20} height={20} />
        <Input
        type="text"
        placeholder="Search events..."
        onChange={(e) => setQuery(e.target.value)}
        className="p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-gray-500
        focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
    </div>
  )
}

export default Search