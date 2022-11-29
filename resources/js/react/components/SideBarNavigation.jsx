import { Layout, Pagination, Button, Navigation, Link } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

export function SideBarNavigation({ activePage, setActivePage }) {

    const handlePagination = (val) => {
        if (val === 'prev' && activePage > 1) {
            setActivePage(activePage - 1)
        }
        if (val === 'next' && activePage < 4) {
            setActivePage(activePage + 1)
        }
    }


    return (
        <>

            <div className={`${activePage === 1 && 'First-Page-Margin'} Template-SideBar`}>
                <Navigation location={activePage}>
                    <Navigation.Section
                        items={[
                            {
                                label: 'Getting Started',
                                selected: activePage === 1,
                                onClick: () => {
                                    setActivePage(1)
                                }
                            },
                            {
                                label: 'Select your template',
                                selected: activePage === 2,
                                onClick: () => {
                                    setActivePage(2)
                                }
                            },
                            {
                                label: 'Customize your widget',
                                selected: activePage === 3,
                                onClick: () => {
                                    setActivePage(3)
                                }
                            },
                            {
                                label: 'Publish it',
                                selected: activePage === 4,
                                onClick: () => {
                                    setActivePage(4)
                                }
                            },
                        ]}
                    />
                </Navigation>

                <Link url='/admin/apps/UsVsThem' >
                    <Button primary>Go to app</Button>
                </Link>
            </div>


            <div className='Templates-Pagination'>
                <Pagination
                    label={`Page ${activePage}`}
                    hasPrevious
                    onPrevious={() => { handlePagination('prev') }}
                    hasNext
                    onNext={() => { handlePagination('next') }}
                />
            </div>


        </>
    )
}


