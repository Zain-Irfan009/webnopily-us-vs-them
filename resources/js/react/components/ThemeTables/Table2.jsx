import React, { useState } from 'react'
import { Card, IndexTable, Icon, Stack, Button } from '@shopify/polaris';
import {
    MobileMajor, DesktopMajor, CircleTickMinor, CircleCancelMinor, CircleTickMajor, CircleCancelMajor
} from '@shopify/polaris-icons';


export function Table2({ themePc, themeMobile, themeHeadingsPc, themeHeadingsMobile, btnShow, handleSelectTemplate,btnloading }) {
    const [screen, setScreen] = useState(true)
    const handleScreenSelection = () => {
        setScreen(!screen)
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
                            {
                                btnloading ?
                                    <Button loading disabled>Select</Button> :
                                    <Button primary onClick={() => handleSelectTemplate(2)}>Select</Button>
                            }
                        </div>
                    </Stack>
                </div>

            </div>
        </Card>
    )
}
