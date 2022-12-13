import React, { useState } from 'react'
import { Card, Icon, Stack, Button } from '@shopify/polaris';
import {
    MobileMajor, DesktopMajor
} from '@shopify/polaris-icons';


export function Table2({  handleSelectTemplate, btnloading }) {
    const [screen, setScreen] = useState(true)
    const handleScreenSelection = () => {
        setScreen(!screen)
    }


    return (
        <Card sectioned>
            <div className='Theme-Card-Content'>
                <div className='Tables-Image-Section'>
                    {screen ?
                        <img src='./images/table2desktop.jpg' alt="desktop table" /> :
                        <img src='./images/table2mobile.jpg' alt="mobile table" />
                    }

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
                                btnloading[2] ?
                                    <Button loading>Select</Button> :
                                    <Button primary onClick={() => handleSelectTemplate(2)}>Select</Button>
                            }
                        </div>
                    </Stack>
                </div>

            </div>
        </Card>
    )
}
