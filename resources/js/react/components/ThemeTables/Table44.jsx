import React, { useState } from 'react'
import { Card, IndexTable, Icon, Stack, Button } from '@shopify/polaris';
import {
    MobileMajor, DesktopMajor, CircleTickMinor, CircleCancelMinor, CircleTickMajor, CircleCancelMajor
} from '@shopify/polaris-icons';

export function Table44({ themePc, themeMobile,yourBrand, otherCompetitors }) {
    const [screen, setScreen] = useState(true)
    const handleScreenSelection = () => {
        setScreen(!screen)
    }

    const resourceName = {
        singular: 'theme',
        plural: 'themes',
    };

    const themeRowsPc = themePc?.map(
        ({  advantage, brand, competitor   }, index) => (
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
        ({ name, yourBrand, others }, index) => (
            <IndexTable.Row
                id={index}
                key={index}
                position={index}
            >

                <IndexTable.Cell>{name}</IndexTable.Cell>
                <IndexTable.Cell>
                    {yourBrand === 'true' ?
                        <span className='Circle-bg-True-Icon'> <Icon source={CircleTickMajor} ></Icon>  </span>
                        :
                        yourBrand === 'false' ?
                            <span className='Circle-bg-False-Icon'> <Icon source={CircleCancelMajor}></Icon> </span>
                            :
                            yourBrand
                    }
                </IndexTable.Cell>

                <IndexTable.Cell>
                    {others === 'true' ?
                        <span className='Circle-bg-True-Icon'> <Icon source={CircleTickMajor} ></Icon>  </span>
                        :
                        others === 'false' ?
                            <span className='Circle-bg-False-Icon'> <Icon source={CircleCancelMajor}></Icon> </span>
                            :
                            others
                    }
                </IndexTable.Cell>
            </IndexTable.Row>
        ),
    );

    const themeHeadingsPc = [
        { title: 'Advantages' },
        { title: `${yourBrand}` },
        { title: `${otherCompetitors}` },
    ]

    return (
        <Card sectioned>
            <div className='Theme-Card-Content'>
                <div className={`${screen ? 'Theme4-Pc-Table' : 'Theme4-Mobile-Table'} Theme-Table`}>
                    <IndexTable
                        resourceName={resourceName}
                        itemCount={themePc?.length}
                        selectable={false}
                        headings={themeHeadingsPc}
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
