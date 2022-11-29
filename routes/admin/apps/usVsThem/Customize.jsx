import React from 'react'
import { Card, Page, EmptyState } from '@shopify/polaris';

export default function Customize() {
  return (
    <Page>
      <Card sectioned>
        <EmptyState
          heading="Customize Page"
          image="https://cdn.shopify.com/shopifycloud/web/assets/v1/bf64694af97df25c00f566ae91ae155319c09b7ef091e670855127f65163e5e9.svg"
          fullWidth
        >
          <p>There’s no content at this page yet</p>
        </EmptyState>
      </Card>
    </Page>
  )
}
