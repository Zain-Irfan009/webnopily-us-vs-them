import { Pagination, Button, Navigation, Link, } from '@shopify/polaris';
import React, { useContext } from 'react';
import { AppContext } from '../Context'

export function SideBarNavigation() {
    const { activePage, setActivePage } = useContext(AppContext);

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
                                disabled: activePage >= 2 ? false : true,
                                onClick: () => {
                                    setActivePage(2)
                                }
                            },
                            {
                                label: 'Customize your widget',
                                selected: activePage === 3,
                                disabled: activePage >= 3 ? false : true,
                                onClick: () => {
                                    setActivePage(3)
                                }
                            },
                            {
                                label: 'Publish it',
                                selected: activePage === 4,
                                disabled: activePage === 4 ? false : true,
                                onClick: () => {
                                    setActivePage(4)
                                }
                            }
                        ]}
                    />
                </Navigation>

                {/* <Link url='/admin/apps/UsVsThem' onClick={handleLocationChange}>
                    <Button primary>Go to app</Button>
                </Link> */}
            </div>


            {/* <div className='Templates-Pagination'>
                <Pagination
                    label={`Page ${activePage}`}
                    hasPrevious
                    onPrevious={() => { handlePagination('prev') }}
                    // hasNext
                    // onNext={() => { handlePagination('next') }}
                />
            </div> */}
        </>
    )
}


