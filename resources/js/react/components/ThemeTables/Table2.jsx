import React, { useState } from 'react'
import { Card, IndexTable, Icon, Stack, Button } from '@shopify/polaris';
import {
    MobileMajor, DesktopMajor, CircleTickMinor, CircleCancelMinor, CircleTickMajor, CircleCancelMajor
} from '@shopify/polaris-icons';


export function Table2({ themePc, themeMobile, themeHeadingsPc, themeHeadingsMobile, btnShow, setActivePage, selectedTemplate, setSelectedTemplate }) {
    const [screen, setScreen] = useState(true)
    const handleScreenSelection = () => {
        setScreen(!screen)
    }

    const handleSelectTable = () => {
        setSelectedTemplate(2)
    }

    const handleCustomizeTable = () => {
        setSelectedTemplate(2)
        setActivePage(3)
    }

    const resourceName = {
        singular: 'theme',
        plural: 'themes',
    };

    const themeRowsPc = themePc?.map(
        ({ name, yourBrand, competitor1, competitor2, competitor3, competitor4 }, index) => (
            <IndexTable.Row
                id={index}
                key={index}
                position={index}
            >

                <IndexTable.Cell>{name}</IndexTable.Cell>
                <IndexTable.Cell>
                    {yourBrand ?
                        <span className='Circle-bg-True-Icon'> <Icon source={CircleTickMinor} ></Icon>  </span> :
                        <span className='Circle-bg-False-Icon'> <Icon source={CircleCancelMinor}></Icon> </span>
                    }

                </IndexTable.Cell>
                <IndexTable.Cell>
                    {competitor1 ?
                        <span className='Circle-bg-True-Icon'> <Icon source={CircleTickMinor} ></Icon>  </span> :
                        <span className='Circle-bg-False-Icon'> <Icon source={CircleCancelMinor}></Icon> </span>
                    }
                </IndexTable.Cell>
                <IndexTable.Cell>
                    {competitor2 ?
                        <span className='Circle-bg-True-Icon'> <Icon source={CircleTickMinor} ></Icon>  </span> :
                        <span className='Circle-bg-False-Icon'> <Icon source={CircleCancelMinor}></Icon> </span>
                    }
                </IndexTable.Cell>
                <IndexTable.Cell>
                    {competitor3 ?
                        <span className='Circle-bg-True-Icon'> <Icon source={CircleTickMinor} ></Icon>  </span> :
                        <span className='Circle-bg-False-Icon'> <Icon source={CircleCancelMinor}></Icon> </span>
                    }
                </IndexTable.Cell>
                <IndexTable.Cell>
                    {competitor4 ?
                        <span className='Circle-bg-True-Icon'> <Icon source={CircleTickMinor} ></Icon>  </span> :
                        <span className='Circle-bg-False-Icon'> <Icon source={CircleCancelMinor}></Icon> </span>
                    }
                </IndexTable.Cell>

            </IndexTable.Row>
        ),
    );

    const themeRowsMobile = themeMobile?.map(
        ({ name, advantage1, advantage2, advantage3, advantage4 }, index) => (
            <IndexTable.Row
                id={index}
                key={index}
                position={index}
            >

                <IndexTable.Cell>{name}</IndexTable.Cell>
                <IndexTable.Cell>
                    {advantage1 ?
                        <span className='Circle-bg-True-Icon'> <Icon source={CircleTickMajor} ></Icon>  </span> :
                        <span className='Circle-bg-False-Icon'> <Icon source={CircleCancelMajor}></Icon> </span>
                    }

                </IndexTable.Cell>
                <IndexTable.Cell>
                    {advantage2 ?
                        <span className='Circle-bg-True-Icon'> <Icon source={CircleTickMajor} ></Icon>  </span> :
                        <span className='Circle-bg-False-Icon'> <Icon source={CircleCancelMajor}></Icon> </span>
                    }
                </IndexTable.Cell>
                <IndexTable.Cell>
                    {advantage3 ?
                        <span className='Circle-bg-True-Icon'> <Icon source={CircleTickMajor} ></Icon>  </span> :
                        <span className='Circle-bg-False-Icon'> <Icon source={CircleCancelMajor}></Icon> </span>
                    }
                </IndexTable.Cell>
                <IndexTable.Cell>
                    {advantage4 ?
                        <span className='Circle-bg-True-Icon'> <Icon source={CircleTickMajor} ></Icon>  </span> :
                        <span className='Circle-bg-False-Icon'> <Icon source={CircleCancelMajor}></Icon> </span>
                    }
                </IndexTable.Cell>
            </IndexTable.Row>
        ),
    );

    // const themeHeadingsPc =
    //     [
    //         { title: '' },
    //         { title: 'Your Brand' },
    //         { title: 'Competitor 1' },
    //         { title: 'Competitor 2' },
    //         { title: 'Competitor 3' },
    //         { title: 'Competitor 4' },
    //     ]

    // const themeHeadingsMobile =
    //     [
    //         { title: '' },
    //         { title: 'Advantage 1' },
    //         { title: 'Advantage 2' },
    //         { title: 'Advantage 3' },
    //         { title: 'Advantage 4' },
    //     ]

    return (
        <Card sectioned>
            <div className='Theme-Card-Content'>
                <div className={`${screen ? 'Theme2-Pc-Table' : 'Theme2-Mobile-Table'} Theme-Table`}>
                    <IndexTable
                        resourceName={resourceName}
                        itemCount={screen ? themePc?.length : themeMobile?.length}
                        selectable={false}
                        headings={screen ? themeHeadingsPc : themeHeadingsMobile}
                    >
                        {screen ? themeRowsPc : btnShow ? themeRowsMobile : themeRowsPc}
                    </IndexTable>
                </div>

                <div className='Screen-Selection'>
                    <Stack>
                        <span></span>
                        <div className='Screen-Selection-Icons'>
                            <span className={`Screen-Icon ${screen && 'selected'}`}
                                onClick={handleScreenSelection}>
                                <Icon source={DesktopMajor} ></Icon>
                            </span>

                            <span className={`Screen-Icon ${!screen && 'selected'}`}
                                onClick={handleScreenSelection}>
                                <Icon source={MobileMajor}></Icon>
                            </span>
                        </div>

                        <div className='Screen-Selection-Btn'>
                            {/* {selectedTemplate === 2 ?
                                <Button onClick={handleCustomizeTable}>Customize</Button> :
                                <Button primary onClick={handleSelectTable}>Select</Button>
                            } */}
                            {
                                btnShow &&
                                <Button primary onClick={handleCustomizeTable}>Select</Button>
                            }
                        </div>
                    </Stack>
                </div>

            </div>
        </Card>
    )
}
