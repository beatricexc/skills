'use client'

import { Category, Prisma, Skill, User } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"
import LevelFilter from "../LevelFilter/LevelFilter"
import { useUpdateSearchParams } from "../hooks/updateSearchParams"
import { useSearchParams } from "next/navigation"
import UserList from "../UserList/UserList"
import UserSkillsPagination from "../Pagination/Pagination"
import CategoryWithSkills from "./CategoryWithSkills"

type FiltersProps = {
  propsCategories: Category[]
}

const prismaOperatorMap: Record<string, keyof Prisma.IntFilter> = {
  '=': 'equals',
  '>': 'gt',
  '<': 'lt',
  '>=': 'gte',
  '<=': 'lte',
}

export default function Filters({ propsCategories }: FiltersProps) {
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [users, setUsers] = useState<User[]>([]);
    const [categories] = useState<Category[]>(propsCategories);
    const [totalItems, setTotalItems] = useState();
    const [skills, setSkills] = useState<Skill[]>([]);

    const searchParams = useSearchParams();
    const updateParams = useUpdateSearchParams();

    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '4');
    const categorySlug = searchParams.get('categorySlug');

    const skillName = searchParams.get('skill');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/find-skills-by-category', { params: { categorySlug } });
                setSkills(response.data.data);
                setErrorMsg('');
            } catch(error) {
                if (axios.isAxiosError(error)) {
                    const message = error.response?.data.message;
                    setErrorMsg(message ?? 'Something went wrong')
                }
            }
        }

        fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categorySlug]);

    const handleLevelFilter = ({ operator, level }: { operator: string; level: number }) => {
        updateParams({ level, operator: prismaOperatorMap[operator] })
    };

    const doSearch = async (params: URLSearchParams) => {
        const query = Object.fromEntries(params.entries());

        const requiredParams = ['categorySlug', 'skill', 'level', 'operator'];
        const hasAllParams = requiredParams.every((key) => key in query && query[key]);

        if (!hasAllParams) {
            console.log('Missing one or more required query parameters.');
            return;
        }

        try {
            const { data: response } = await axios.get('/api/users-filter', { params: query });
            setUsers(response.data.userWithSkills);
            setTotalItems(response.data.totalUserWithSkills);
            setErrorMsg('');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data.message;
                setErrorMsg(message ?? 'Something went wrong');
            }
        }
    };

    useEffect(() => {
        const fetchOnLoad = async () => {
            await doSearch(searchParams);
        };

        fetchOnLoad();
    }, []);

    return (
        <div>
            <div className="mb-6">
                <CategoryWithSkills
                    propCategorySlug={categorySlug || ''}
                    propSkillName={skillName || ''}
                    propCategories={categories}
                    propSkills={skills}
                />
            </div>

            <div className="mb-6">
                <LevelFilter onChange={handleLevelFilter} />
            </div>
            {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
                    ⚠️ {errorMsg}
                </div>
            )}

            <UserList users={users} />

            <UserSkillsPagination currentPage={page} pageSize={pageSize} totalItems={totalItems} doSearch={doSearch} />
        </div>
    )
}
