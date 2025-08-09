"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const CategoryFilter = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    useEffect(() => {
        const getCategories = async () => {
            const categoryList = await getAllCategories();

            categoryList && setCategories(categoryList as ICategory[])
        }

        getCategories();
    }, [])
    // useEffect(() => {
    //     const delayDebounceFn = setTimeout(() => {
    //     }, 300)

    //     return () => clearTimeout(delayDebounceFn);
    // }, [categories, searchParams, router])

    const onSelectCategory = (category: string) => { 
        let newUrl = '';
            if (categories && category !== 'All') {
                newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: 'category',
                    value: category
                })
            } else {
                newUrl = removeKeysFromQuery({
                    params: searchParams.toString(),
                    keysToRemove: ['category']
                })
            }

            router.push(newUrl, { scroll: false });
        

    }
    return (
        <Select onValueChange={(value: string) => onSelectCategory(value)}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All" className="select-item p-regular-14">Todos</SelectItem>
                {categories.map((category)=> (
                    <SelectItem value={category.name} key={category._id} className="select-item p-regular-14">{category.name}</SelectItem>
                ))}

            </SelectContent>
        </Select>

    )
}

export default CategoryFilter