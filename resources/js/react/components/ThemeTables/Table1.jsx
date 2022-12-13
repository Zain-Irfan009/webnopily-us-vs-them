import React, { useState } from 'react'
import { Card, IndexTable, Icon, Stack, Button } from '@shopify/polaris';
import {
    TickMinor, CancelMinor, MobileMajor, DesktopMajor, CircleTickMajor, CircleCancelMajor
} from '@shopify/polaris-icons';

export function Table1({ themePc, themeMobile, btnShow, handleSelectTemplate, btnloading }) {
    const [screen, setScreen] = useState(true)
    const handleScreenSelection = () => {
        setScreen(!screen)
    }
    const resourceName = {
        singular: 'theme',
        plural: 'themes',
    };

    const themeRowsPc = themePc?.map(
        ({ name, yourBrand, competitor }, index) => (
            <IndexTable.Row
                id={index}
                key={index}
                position={index}
            >
                <IndexTable.Cell> <span>{name}</span></IndexTable.Cell>

                <IndexTable.Cell>
                    <span className='White-Icons'>
                        {yourBrand ?
                            <Icon source={TickMinor}></Icon> :
                            <Icon source={CancelMinor}></Icon>
                        }
                    </span>
                </IndexTable.Cell>
                <IndexTable.Cell>
                    {competitor ?
                        <Icon source={TickMinor}></Icon> :
                        <Icon source={CancelMinor}></Icon>
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
                    <span className='White-Icons'>
                        {yourBrand ?
                            <Icon source={CircleTickMajor}></Icon> :
                            <Icon source={CircleCancelMajor}></Icon>
                        }
                    </span>
                </IndexTable.Cell>
                <IndexTable.Cell>
                    {competitor ?
                        <Icon source={CircleTickMajor}></Icon> :
                        <Icon source={CircleCancelMajor}></Icon>
                    }
                </IndexTable.Cell>

            </IndexTable.Row>
        )
    );

    const themeHeadingsPc =
        [
            { title: '' },
            { title: 'Your Brand' },
            { title: 'competitor' }
        ]

    const themeHeadingsMobile =
        [
            { title: '' },
            { title: 'Your Brand' },
            { title: 'Other Competitors' }
        ]

    return (
        <Card sectioned>
            <div className='Theme-Card-Content'>
                <div className={`${screen ? 'Theme1-Pc-Table' : 'Theme1-Mobile-Table'} Theme-Table`}>
                    <IndexTable
                        resourceName={resourceName}
                        itemCount={screen ? themePc?.length : themeMobile?.length}
                        selectable={false}
                        headings={screen ? themeHeadingsPc : themeHeadingsMobile}
                    >
                        {screen ? themeRowsPc : themeRowsMobile}
                        <IndexTable.Row>
                            <IndexTable.Cell>;</IndexTable.Cell>
                            <IndexTable.Cell>;</IndexTable.Cell>
                            <IndexTable.Cell>;</IndexTable.Cell>
                        </IndexTable.Row>
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
                                    <Button loading >Select</Button> :
                                    <Button primary onClick={() => handleSelectTemplate(1)}>Select</Button>
                            }
                        </div>
                    </Stack>
                </div>

            </div>
        </Card>
    )
}
