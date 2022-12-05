import React, { useState } from 'react'
import { Card, IndexTable, Icon, Stack, Button } from '@shopify/polaris';
import {
    MobileMajor, DesktopMajor, CircleTickMinor, CircleCancelMinor, CircleTickMajor, CircleCancelMajor
} from '@shopify/polaris-icons';


export function Table3({ themePc, themeMobile, btnShow, handleSelectTemplate }) {
    const [screen, setScreen] = useState(true)
    const handleScreenSelection = () => {
        setScreen(!screen)
    }

    const resourceName = {
        singular: 'theme',
        plural: 'themes',
    };

    const themeRowsPc = themePc?.map(
        ({ name, yourBrand, competitor1, competitor2, competitor3 }, index) => (
            <IndexTable.Row
                id={index}
                key={index}
                position={index}
            >

                <IndexTable.Cell>{name}</IndexTable.Cell>
                <IndexTable.Cell>
                    {yourBrand === 'true' ?
                        <span className='Circle-bg-False-Icon'> <Icon source={CircleTickMinor} ></Icon>  </span>
                        :
                        yourBrand === 'false' ?
                            <span className='Circle-bg-False-Icon'> <Icon source={CircleCancelMinor}></Icon> </span>
                            :
                            yourBrand
                    }
                </IndexTable.Cell>

                <IndexTable.Cell>
                    {competitor1 === 'true' ?
                        <span className='Circle-bg-False-Icon'> <Icon source={CircleTickMinor} ></Icon>  </span>
                        :
                        competitor1 === 'false' ?
                            <span className='Circle-bg-False-Icon'> <Icon source={CircleCancelMinor}></Icon> </span>
                            :
                            competitor1
                    }
                </IndexTable.Cell>

                <IndexTable.Cell>
                    {competitor2 === 'true' ?
                        <span className='Circle-bg-False-Icon'> <Icon source={CircleTickMinor} ></Icon>  </span>
                        :
                        competitor2 === 'false' ?
                            <span className='Circle-bg-False-Icon'> <Icon source={CircleCancelMinor}></Icon> </span>
                            :
                            competitor2
                    }
                </IndexTable.Cell>

                <IndexTable.Cell>
                    {competitor3 === 'true' ?
                        <span className='Circle-bg-True-Icon'> <Icon source={CircleTickMinor} ></Icon>  </span>
                        :
                        competitor3 === 'false' ?
                            <span className='Circle-bg-False-Icon'> <Icon source={CircleCancelMinor}></Icon> </span>
                            :
                            competitor3
                    }
                </IndexTable.Cell>


            </IndexTable.Row>
        ),
    );

    const themeRowsMobile = themeMobile?.map(
        ({ name, yourBrand, competitor }, index) => (
            <IndexTable.Row
                id={index}
                key={index}
                position={index}
            >

                <IndexTable.Cell>{name}</IndexTable.Cell>
                <IndexTable.Cell>
                    {yourBrand === 'true' ?
                        <span className='Circle-bg-False-Icon'> <Icon source={CircleTickMajor} ></Icon>  </span>
                        :
                        yourBrand === 'false' ?
                            <span className='Circle-bg-False-Icon'> <Icon source={CircleCancelMajor}></Icon> </span>
                            :
                            yourBrand
                    }
                </IndexTable.Cell>

                <IndexTable.Cell>
                    {competitor === 'true' ?
                        <span className='Circle-bg-False-Icon'> <Icon source={CircleTickMajor} ></Icon>  </span>
                        :
                        competitor === 'false' ?
                            <span className='Circle-bg-False-Icon'> <Icon source={CircleCancelMajor}></Icon> </span>
                            :
                            competitor
                    }
                </IndexTable.Cell>

            </IndexTable.Row>
        ),
    );

    const themeHeadingsPc = [
        { title: '' },
        { title: 'Your Brand' },
        { title: 'Competitor 1' },
        { title: 'Competitor 2' },
        { title: 'Competitor 3' },
    ]

    const themeHeadingsMobile = [
        { title: '' },
        { title: 'Your Brand' },
        { title: 'Competitor' },
    ]


    return (
        <Card sectioned>
            <div className='Theme-Card-Content'>
                <div className={`${screen ? 'Theme3-Pc-Table' : 'Theme3-Mobile-Table'} Theme-Table`}>
                    <IndexTable
                        resourceName={resourceName}
                        itemCount={screen ? themePc?.length : themeMobile?.length}
                        selectable={false}
                        headings={screen ? themeHeadingsPc : themeHeadingsMobile}
                    >
                        {screen ? themeRowsPc : themeRowsMobile}
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
                            {
                                btnShow &&
                                <Button primary onClick={() => handleSelectTemplate(3)}>Select</Button>
                            }
                        </div>
                    </Stack>
                </div>
            </div>
        </Card>
    )
}
