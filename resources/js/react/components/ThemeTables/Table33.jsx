import React, { useState } from 'react'
import { Card, IndexTable, Icon, Stack, Button } from '@shopify/polaris';
import {
    MobileMajor,
    DesktopMajor,
    CircleTickMinor,
    CircleCancelMinor,
    CircleTickMajor,
    CircleCancelMajor,
    TickMinor,
    CancelMinor
} from '@shopify/polaris-icons';


export function Table33({ themePc, themeMobile, yourBrand, otherCompetitors }) {
    const [screen, setScreen] = useState(true)
    const handleScreenSelection = () => {
        setScreen(!screen)
    }

    const resourceName = {
        singular: 'theme',
        plural: 'themes',
    };

    const themeRowsPc = themePc?.map(
        ({advantage, brand, competitor }, index) => (
            <IndexTable.Row
                id={index}
                key={index}
                position={index}
            >

                <IndexTable.Cell>{advantage}</IndexTable.Cell>
                <IndexTable.Cell>

                    {brand ?
                        <span className='Circle-bg-False-Icon'> <Icon source={CircleTickMinor} ></Icon>  </span> :

                        <span className='Circle-bg-False-Icon'> <Icon source={CircleCancelMinor}></Icon> </span>
                    }
                </IndexTable.Cell>

                <IndexTable.Cell>
                    {competitor ?
                        <span className='Circle-bg-False-Icon'> <Icon source={CircleTickMinor} ></Icon>  </span>
                        :

                            <span className='Circle-bg-False-Icon'> <Icon source={CircleCancelMinor}></Icon> </span>

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
        { title: `${yourBrand}` },
        { title: `${otherCompetitors}` },


    ]

    const themeHeadingsMobile = [
        { title: '' },
        { title: `${yourBrand}` },
        { title: `${otherCompetitors}` }
    ]


    return (
        <Card sectioned>
            <div className='Theme-Card-Content'>
                <div className={`${screen ? 'Theme3-Pc-Table' : 'Theme3-Mobile-Table'} Theme-Table`}>
                    <IndexTable
                        resourceName={resourceName}
                        itemCount={screen ? themePc?.length : themeMobile?.length}
                        selectable={false}
                        headings={screen ? themeHeadingsPc : themeHeadingsPc}
                    >
                        {screen ? themeRowsPc : themeRowsPc}
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

                        <span></span>
                    </Stack>
                </div>
            </div>
        </Card>
    )
}
