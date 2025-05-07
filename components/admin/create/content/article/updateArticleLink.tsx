'use client'
import React, { useState, useEffect, useRef } from 'react'
import { ChooseRedirect } from '../../../../generics/articleRedirect/ChooseRedirect'
import { RedirectLink } from '../../../../generics/articleRedirect/RedirectLink'
import { RedirectArticle } from '../../../../generics/articleRedirect/RedirectArticle'

interface UpdateArticleLinkProps {
    contentType?: 'event' | 'announcement' | 'scholarship' | 'internship'
    onArticleChange?: (articleData: any | null) => void
    onExternalUrlChange?: (url: string | null) => void
    initialExternalUrl?: string
    initialArticle?: {
        title: string
        body: string
        author: string
    } | null
    redirectState: string
    setRedirectState: React.Dispatch<React.SetStateAction<any>>
}

export const UpdateArticleLink = ({
    contentType = 'event',
    onArticleChange,
    onExternalUrlChange,
    initialExternalUrl,
    initialArticle,
    redirectState,
    setRedirectState,
}: UpdateArticleLinkProps) => {
    const [articleData, setArticleData] = useState(initialArticle ?? null)
    const [externalUrl, setExternalUrl] = useState(initialExternalUrl ?? null)

    // Use ref to track initial render
    const initialRender = useRef(true)

    // Only update on redirectState changes, not every time externalUrl changes
    useEffect(() => {
        if (initialExternalUrl) {
            setExternalUrl(initialExternalUrl)
        }

        console.log('external url: ', initialExternalUrl)
    }, [initialExternalUrl])

    useEffect(() => {
        if (initialArticle) {
            setArticleData(initialArticle)
        }
    }, [initialArticle])

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }

        if (redirectState === 'link' && onExternalUrlChange) {
            onExternalUrlChange(externalUrl)
        } else if (redirectState === 'article' && onArticleChange) {
            onArticleChange(articleData)
        } else if (redirectState === 'none') {
            if (onArticleChange) onArticleChange(null)
            if (onExternalUrlChange) onExternalUrlChange(null)
        }

        console.log('Redirect state changed to:', redirectState)
    }, [redirectState])

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

    // Handle article data change
    const handleArticleChange = (data: any) => {
        setArticleData(data)
        if (onArticleChange) {
            onArticleChange(redirectState === 'article' ? data : null)
        }
    }

    // Handle external URL changes
    const handleExternalUrlChange = (url: string) => {
        setExternalUrl(url)
        if (onExternalUrlChange && redirectState === 'link') {
            onExternalUrlChange(url)
        }
    }

    // Update parent when redirect state changes
    const handleRedirectChange = (state: string) => {
        setRedirectState(state)

        // Clear the other type of data when switching
        if (state === 'none') {
            if (onArticleChange) onArticleChange(null)
            if (onExternalUrlChange) onExternalUrlChange(null)
        } else if (state === 'article') {
            if (onArticleChange) onArticleChange(articleData)
            if (onExternalUrlChange) onExternalUrlChange(null)
        } else if (state === 'link') {
            if (onArticleChange) onArticleChange(null)
            if (onExternalUrlChange) onExternalUrlChange(externalUrl)
        }
    }

    return (
        <div className="p-4 md:px-8 md:py-8 bg-csg-blue-400 space-y-10 rounded-lg">
            <ChooseRedirect
                redirectState={redirectState}
                setRedirectState={handleRedirectChange}
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
                            <RedirectLink
                                onExternalUrlChange={handleExternalUrlChange}
                                initialUrl={initialExternalUrl}
                            />
                        </div>
                    )}
                    {redirectState === 'article' && (
                        <div className="border border-gray-400 rounded-lg p-4 bg-gray-800/30">
                            <RedirectArticle
                                contentType={contentType}
                                onArticleDataChange={handleArticleChange}
                                initialArticleData={articleData}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
