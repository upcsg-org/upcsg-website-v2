'use client'
import React, { useState } from 'react'
import { ChooseRedirect } from '../../../../generics/articleRedirect/ChooseRedirect'
import { RedirectLink } from '../../../../generics/articleRedirect/RedirectLink'
import { RedirectArticle } from '../../../../generics/articleRedirect/RedirectArticle'

export const CreateArticleLink = () => {
    const [redirectState, setRedirectState] = useState('none')
    return (
        <div className="px-12 md:px-16 lg:px-24 py-8 bg-csg-blue-400 space-y-10">
            <ChooseRedirect
                redirectState={redirectState}
                setRedirectState={setRedirectState}
            />
            {redirectState === 'none' ? (
                <div></div>
            ) : (
                <div>
                    {redirectState === 'link' && <RedirectLink />}
                    {redirectState === 'article' && <RedirectArticle />}
                </div>
            )}
        </div>
    )
}
