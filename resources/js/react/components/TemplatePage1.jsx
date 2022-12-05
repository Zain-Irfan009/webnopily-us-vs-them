import React, { useContext } from 'react';
import { Page, Card, MediaCard } from '@shopify/polaris';
import { AppContext } from '../Context'

// export function TemplatePage1({ setActivePage }) {
export function TemplatePage1() {
    const { setActivePage } = useContext(AppContext);

    

    return (
        <div className='Template-Page1'>
            <Page title="Welcome to Us vs Them" fullWidth>

                <Card sectioned>
                    <h5>Getting Started</h5>
                    <p>
                        Choose the template that best suits your needs. You will then be able to
                        fully customize it.
                    </p>
                </Card>

                <MediaCard
                    title="Choose your template"
                    primaryAction={{
                        content: 'Choose my template',
                        onAction: () => setActivePage(2),
                    }}
                    description={`Choose the template that best suits your needs. You will then be able to
                            fully customize it.`}
                    // popoverActions={[
                    //     {
                    //         content: 'Rename',
                    //         onAction: () => { }
                    //     },
                    //     {
                    //         content: 'Duplicate',
                    //         onAction: () => { }
                    //     },
                    //     {
                    //         content: 'Delete',
                    //         onAction: () => { }
                    //     }
                    // ]}
                >
                    <img
                        alt="table1"
                        className='MediaCard-Img'
                        src="https://i.ibb.co/QXcJW8V/image.png"
                    />
                </MediaCard>
            </Page>

        </div>
    )
}