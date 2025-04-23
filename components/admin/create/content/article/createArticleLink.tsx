'use client'
import React, { useState } from 'react'
import { ChooseRedirect } from '../../../../generics/articleRedirect/ChooseRedirect'
import { RedirectLink } from '../../../../generics/articleRedirect/RedirectLink'
import { RedirectArticle } from '../../../../generics/articleRedirect/RedirectArticle'

interface CreateArticleLinkProps {
    contentType?: 'event' | 'announcement' | 'scholarship' | 'internship'
}

export const CreateArticleLink = ({
    contentType = 'event',
}: CreateArticleLinkProps) => {
    const [redirectState, setRedirectState] = useState('none')

    const getRedirectTitle = () => {
        switch (contentType) {
            case 'event':
                return 'Event'
            case 'announcement':
                return 'Announcement'
            case 'scholarship':
                return 'Scholarship'
            case 'internship':
                return 'Internship'
            default:
                return 'Content'
        }
    }

    return (
        <div className="px-12 md:px-16 lg:px-24 py-8 bg-csg-blue-400 space-y-10 rounded-lg">
            <h2 className="font-semibold text-xl">
                {getRedirectTitle()} Redirect Setting
            </h2>
            <ChooseRedirect
                redirectState={redirectState}
                setRedirectState={setRedirectState}
            />
            {redirectState === 'none' ? (
                <div className="p-4 border border-gray-400 rounded-lg bg-gray-800/30">
                    <p>
                        No redirect will be created for this{' '}
                        {getRedirectTitle().toLowerCase()}.
                    </p>
                </div>
            ) : (
                <div>
                    {redirectState === 'link' && (
                        <div className="border border-gray-400 rounded-lg p-4 bg-gray-800/30">
                            <RedirectLink />
                        </div>
                    )}
                    {redirectState === 'article' && (
                        <div className="border border-gray-400 rounded-lg p-4 bg-gray-800/30">
                            <RedirectArticle contentType={contentType} />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
