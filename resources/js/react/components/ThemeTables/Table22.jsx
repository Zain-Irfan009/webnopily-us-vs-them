import React, { useState } from 'react'
import { Card, IndexTable, Icon, Stack, Button } from '@shopify/polaris';
import {
    MobileMajor, DesktopMajor, CircleTickMinor, CircleCancelMinor, CircleTickMajor, CircleCancelMajor
} from '@shopify/polaris-icons';


export function Table22({ themePc, themeMobile,yourBrand, otherCompetitors }) {
    const [screen, setScreen] = useState(true)
    const handleScreenSelection = () => {
        setScreen(!screen)
    }


    const resourceName = {
        singular: 'theme',
        plural: 'themes',
    };

    const themeRowsPc = themePc?.map(
        ({  advantage, brand, competitor }, index) => (
            <IndexTable.Row
                id={index}
                key={index}
                position={index}
            >

                <IndexTable.Cell>{advantage}</IndexTable.Cell>
                <IndexTable.Cell>
                    {brand ?
                        <span className='Circle-bg-True-Icon'> <Icon source={CircleTickMinor} ></Icon>  </span> :
                        <span className='Circle-bg-False-Icon'> <Icon source={CircleCancelMinor}></Icon> </span>
                    }

                </IndexTable.Cell>
                <IndexTable.Cell>
                    {competitor ?
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
    const themeHeadingsPc =
        [
            { title: '' },
            { title: `${yourBrand}` },
            { title: `${otherCompetitors} ` },


        ]


    return (
        <Card sectioned>
            <div className='Theme-Card-Content'>
                <div className={`${screen ? 'Theme2-Pc-Table' : 'Theme2-Mobile-Table'} Theme-Table`}>
                    <IndexTable
                        resourceName={resourceName}
                        itemCount={screen ? themePc?.length : themeMobile?.length}
                        selectable={false}
                        headings={screen ? themeHeadingsPc : themeHeadingsPc}
                    >
                        {screen ? themeRowsPc :  themeRowsPc}
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
