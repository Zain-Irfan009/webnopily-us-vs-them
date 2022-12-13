import React, { useState } from 'react'
import { Card, IndexTable, Icon, Stack, Button } from '@shopify/polaris';
import {
    MobileMajor, DesktopMajor, CircleTickMinor, CircleCancelMinor, CircleTickMajor, CircleCancelMajor
} from '@shopify/polaris-icons';

export function Table4({ themePc, themeMobile, btnShow, handleSelectTemplate,btnloading }) {
    const [screen, setScreen] = useState(true)
    const handleScreenSelection = () => {
        setScreen(!screen)
    }

    const resourceName = {
        singular: 'theme',
        plural: 'themes',
    };

    const themeRowsPc = themePc?.map(
        ({ name, yourBrand, others }, index) => (
            <IndexTable.Row
                id={index}
                key={index}
                position={index}
            >

                <IndexTable.Cell>{name}</IndexTable.Cell>
                <IndexTable.Cell>
                    {yourBrand === 'true' ?
                        <span className='Circle-bg-True-Icon'> <Icon source={CircleTickMinor} ></Icon>  </span>
                        :
                        yourBrand === 'false' ?
                            <span className='Circle-bg-False-Icon'> <Icon source={CircleCancelMinor}></Icon> </span>
                            :
                            yourBrand
                    }
                </IndexTable.Cell>

                <IndexTable.Cell>
                    {others === 'true' ?
                        <span className='Circle-bg-True-Icon'> <Icon source={CircleTickMinor} ></Icon>  </span>
                        :
                        others === 'false' ?
                            <span className='Circle-bg-False-Icon'> <Icon source={CircleCancelMinor}></Icon> </span>
                            :
                            others
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
        { title: 'Your Brand' },
        { title: 'Others' },
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
                                btnloading[4] ?
                                    <Button loading>Select</Button> :
                                <Button primary onClick={() => handleSelectTemplate(4)}>Select</Button>
                            }
                        </div>
                    </Stack>
                </div>
            </div>
        </Card>
    )
}
